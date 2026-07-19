import type { RegisterOptions } from "react-hook-form";
import type { CreateUserBody } from "../../../../../shared/types";

// Field rules mirror the server's express-validator constraints.
export const displayNameRules: RegisterOptions<CreateUserBody, "displayName"> = {
    required: "El nombre es obligatorio",
    minLength: { value: 2, message: "Mínimo 2 caracteres" },
    maxLength: { value: 60, message: "Máximo 60 caracteres" },
};

export const usernameRules: RegisterOptions<CreateUserBody, "username"> = {
    required: "El usuario es obligatorio",
    minLength: { value: 6, message: "Mínimo 6 caracteres" },
    maxLength: { value: 32, message: "Máximo 32 caracteres" },
};

export const passwordRules: RegisterOptions<CreateUserBody, "password"> = {
    required: "La contraseña es obligatoria",
    minLength: { value: 8, message: "Mínimo 8 caracteres" },
    maxLength: { value: 32, message: "Máximo 32 caracteres" },
};
