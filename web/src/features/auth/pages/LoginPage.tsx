import { Link } from "react-router-dom";
import { ButtonForm } from "../../../shared/components/ButtonForm";
import { InputForm } from "../../../shared/components/InputForm";
import { ModalLayout } from "../../../shared/components/ModalLayout";
import { useLogin } from "../hooks/useLogin";
import { usernameRules, passwordRules } from "../validations/loginValidation";

export const LoginPage = () => {
    const { register, onSubmit, errors, isLoading, serverError } = useLogin();

    return (
        <ModalLayout title="Iniciar Sesión">
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
        </ModalLayout>
    );
};
