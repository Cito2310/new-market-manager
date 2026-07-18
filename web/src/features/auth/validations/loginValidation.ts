import type { RegisterOptions } from "react-hook-form";
import type { LoginBody } from "../../../../../shared/types";

// Field rules mirror the server's express-validator constraints.
export const usernameRules: RegisterOptions<LoginBody, "username"> = {
    required: "El usuario es obligatorio",
    minLength: { value: 6, message: "Mínimo 6 caracteres" },
    maxLength: { value: 32, message: "Máximo 32 caracteres" },
};

export const passwordRules: RegisterOptions<LoginBody, "password"> = {
    required: "La contraseña es obligatoria",
    minLength: { value: 8, message: "Mínimo 8 caracteres" },
    maxLength: { value: 32, message: "Máximo 32 caracteres" },
};
