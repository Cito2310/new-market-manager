import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { Topbar } from "../../features/topbar/Topbar";

// Guards authenticated-only routes: sends guests to the login page.
// Authenticated pages share the topbar rendered here above the routed content.
export const ProtectedRoute = () => {
    const status = useAppSelector((state) => state.auth.status);

    // Session is still being restored from storage: wait before deciding.
    if (status === "initializing") return null;

    if (status !== "authenticated") return <Navigate to="/login" replace />;

    return (
        <>
            <Topbar />
            <Outlet />
        </>
    );
};
