import { useForm } from "react-hook-form";
import type { CreateUserBody } from "../../../../../shared/types";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { registerUser } from "../authThunks";

// Encapsulates the register form: validation, submit and auth state.
export const useRegister = () => {
    const dispatch = useAppDispatch();
    const { status, error } = useAppSelector((state) => state.auth);

    const { register, handleSubmit, formState } = useForm<CreateUserBody>();

    const onSubmit = handleSubmit((data) => {
        dispatch(registerUser(data));
    });

    return {
        register,
        onSubmit,
        errors: formState.errors,
        isLoading: status === "loading",
        serverError: error,
    };
};
