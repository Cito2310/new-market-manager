import { Link } from "react-router-dom";

export const RegisterPage = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
                <section className="mb-4 text-center">
                    <h1 className="text-2xl font-bold text-slate-800">
                        Crear cuenta
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">Próximamente</p>
                </section>

                <p className="text-center text-sm text-slate-500">
                    ¿Ya tienes cuenta?{" "}
                    <Link
                        to="/login"
                        className="font-medium text-slate-800 underline-offset-2 hover:underline"
                    >
                        Inicia sesión
                    </Link>
                </p>
            </div>
        </div>
    );
};
