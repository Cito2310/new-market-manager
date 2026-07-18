import { useForm } from "react-hook-form";
import type { LoginBody } from "../../../../../shared/types";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { login } from "../authThunks";

// Encapsulates the login form: validation, submit and auth state.
export const useLogin = () => {
    const dispatch = useAppDispatch();
    const { status, error } = useAppSelector((state) => state.auth);

    const { register, handleSubmit, formState } = useForm<LoginBody>();

    const onSubmit = handleSubmit((data) => {
        dispatch(login(data));
    });

    return {
        register,
        onSubmit,
        errors: formState.errors,
        isLoading: status === "loading",
        serverError: error,
    };
};
