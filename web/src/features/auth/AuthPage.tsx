import { ButtonForm } from "../../shared/components/ButtonForm";
import { InputForm } from "../../shared/components/InputForm";

export const AuthPage = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
                <section className="mb-4 text-center">
                    <h1 className="text-2xl font-bold text-slate-800">
                        Iniciar Sesión
                    </h1>
                </section>

                <form className="flex flex-col gap-5">
                    <InputForm
                        label="Usuario"
                        type="text"
                        placeholder="Tu usuario"
                    />

                    <InputForm
                        label="Contraseña"
                        type="password"
                        placeholder="••••••••"
                    />

                    <ButtonForm className="mt-2">Ingresar</ButtonForm>
                </form>
            </div>
        </div>
    );
};
