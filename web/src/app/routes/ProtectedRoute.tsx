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

    // The shell owns the viewport height so the window itself never scrolls: pages
    // scroll inside the content area, keeping the topbar clear of the scrollbar.
    return (
        <div className="flex h-screen flex-col">
            <Topbar />
            <div className="min-h-0 flex-1 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
};
