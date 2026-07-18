import { Link } from "react-router-dom";
import { ButtonForm } from "../../../shared/components/ButtonForm";
import { InputForm } from "../../../shared/components/InputForm";
import { useLogin } from "../hooks/useLogin";
import { usernameRules, passwordRules } from "../validations/loginValidation";

export const LoginPage = () => {
    const { register, onSubmit, errors, isLoading, serverError } = useLogin();

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
                <section className="mb-4 text-center">
                    <h1 className="text-2xl font-bold text-slate-800">
                        Iniciar Sesión
                    </h1>
                </section>

                <form onSubmit={onSubmit} className="flex flex-col gap-5">
                    <InputForm
                        {...register("username", usernameRules)}
                        label="Usuario"
                        type="text"
                        placeholder="Tu usuario"
                        error={errors.username?.message}
                    />

                    <InputForm
                        {...register("password", passwordRules)}
                        label="Contraseña"
                        type="password"
                        placeholder="••••••••"
                        error={errors.password?.message}
                    />

                    {serverError && (
                        <p className="text-center text-sm text-red-500 -mb-4">
                            {serverError}
                        </p>
                    )}

                    <ButtonForm className="mt-2" disabled={isLoading}>
                        {isLoading ? "Ingresando…" : "Ingresar"}
                    </ButtonForm>
                </form>

                <p className="mt-6 text-center text-sm text-slate-500">
                    ¿No tienes cuenta?{" "}
                    <Link
                        to="/register"
                        className="font-medium text-slate-800 underline-offset-2 hover:underline"
                    >
                        Regístrate
                    </Link>
                </p>
            </div>
        </div>
    );
};
