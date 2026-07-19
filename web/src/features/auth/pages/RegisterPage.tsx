import { Link } from "react-router-dom";
import { ButtonForm } from "../../../shared/components/ButtonForm";
import { InputForm } from "../../../shared/components/InputForm";
import { ModalLayout } from "../../../shared/components/ModalLayout";
import { useRegister } from "../hooks/useRegister";
import {
    displayNameRules,
    usernameRules,
    passwordRules,
} from "../validations/registerValidation";

export const RegisterPage = () => {
    const { register, onSubmit, errors, isLoading, serverError } = useRegister();

    return (
        <ModalLayout title="Crear cuenta">
            <form onSubmit={onSubmit} className="flex flex-col gap-5">
                <InputForm
                    {...register("displayName", displayNameRules)}
                    label="Nombre"
                    type="text"
                    placeholder="Tu nombre"
                    error={errors.displayName?.message}
                />

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
                    {isLoading ? "Creando cuenta…" : "Crear cuenta"}
                </ButtonForm>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
                ¿Ya tienes cuenta?{" "}
                <Link
                    to="/login"
                    className="font-medium text-slate-800 underline-offset-2 hover:underline"
                >
                    Inicia sesión
                </Link>
            </p>
        </ModalLayout>
    );
};
