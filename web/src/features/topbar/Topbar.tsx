import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { logout } from "../auth/authThunks";
import { LogoutIcon } from "../../shared/components/icons/LogoutIcon";
import { Button } from "../../shared/components/Button";

const navItems = [
    { to: "/pos", label: "Registradora" },
    { to: "/products", label: "Productos" },
    { to: "/reports", label: "Reportes" }
];

export const Topbar = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);

    const buttonNavClass = ({ isActive }: { isActive: boolean }) => 
        `flex items-center text-sm transition-all px-3
        hover:brightness-[.97] active:brightness-[.93] text-slate-700
        ${ isActive ? "bg-slate-400/40" : "bg-slate-300" }`

    return (
        <header className="bg-slate-300">
            <div className="flex justify-between mx-auto max-w-5xl px-8">
                <nav className="flex">
                    { navItems.map((item) => (
                        <NavLink key={item.to} to={item.to} className={buttonNavClass}>
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    {user && <span className="text-sm text-slate-600">{user.displayName}</span> }

                    <Button square variant="nav" onClick={() => dispatch(logout())} aria-label="Cerrar sesión">
                        <LogoutIcon/>
                    </Button>
                </div>
            </div>
        </header>
    );
};
