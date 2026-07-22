import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { DEFAULT_AUTH_ROUTE } from "./routes";

// Guards guest-only routes (login/register): sends authenticated users into the app.
export const GuestRoute = () => {
    const status = useAppSelector((state) => state.auth.status);

    // Session is still being restored from storage: wait before deciding.
    if (status === "initializing") return null;

    if (status === "authenticated") {
        return <Navigate to={DEFAULT_AUTH_ROUTE} replace />;
    }

    return <Outlet />;
};
