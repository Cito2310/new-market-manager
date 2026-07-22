import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

// Guards authenticated-only routes: sends guests to the login page.
export const ProtectedRoute = () => {
    const status = useAppSelector((state) => state.auth.status);

    // Session is still being restored from storage: wait before deciding.
    if (status === "initializing") return null;

    if (status !== "authenticated") return <Navigate to="/login" replace />;

    return <Outlet />;
};
