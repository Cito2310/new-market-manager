import { useEffect } from "react";
import type { PublicUser } from "../../../../shared/types";
import { useAppDispatch } from "../store/hooks";
import { restoreSession, initFinished } from "../../features/auth/authSlice";
import { storage } from "../storage";

// Runs the app-wide initialization logic (restore session, fetch config, etc.).
export const useInitApp = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const init = async () => {
            const token = await storage.get<string>("token");
            const user = await storage.get<PublicUser>("user");
            if (token && user) {
                dispatch(restoreSession({ token, user }));
            } else {
                dispatch(initFinished());
            }
        };

        init();
    }, [dispatch]);
};
