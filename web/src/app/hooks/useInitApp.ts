import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { restoreSession } from "../../features/auth/authSlice";
import { storage } from "../storage";

// Runs the app-wide initialization logic (restore session, fetch config, etc.).
export const useInitApp = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const init = async () => {
            const token = await storage.get<string>("token");
            if (token) dispatch(restoreSession({ token }));
        };

        init();
    }, [dispatch]);
};
