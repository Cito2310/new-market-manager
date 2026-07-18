import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../../../shared/types";

// The client never holds the password hash.
export type AuthUser = Omit<User, "passwordHash">;

type AuthStatus = "idle" | "loading" | "authenticated" | "error";

interface AuthState {
    token: string | null;
    user: AuthUser | null;
    status: AuthStatus;
    error: string | null;
}

const initialState: AuthState = {
    token: null,
    user: null,
    status: "idle",
    error: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Rehydrates a persisted token on app start; the user is fetched afterwards.
        restoreSession: (state, action: PayloadAction<{ token: string }>) => {
            state.token = action.payload.token;
            state.status = "authenticated";
        },
        loginStart: (state) => {
            state.status = "loading";
            state.error = null;
        },
        loginSuccess: (
            state,
            action: PayloadAction<{ token: string; user?: AuthUser }>,
        ) => {
            state.token = action.payload.token;
            state.user = action.payload.user ?? null;
            state.status = "authenticated";
            state.error = null;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.token = null;
            state.user = null;
            state.status = "error";
            state.error = action.payload;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.status = "idle";
            state.error = null;
        },
    },
});

export const { restoreSession, loginStart, loginSuccess, loginFailure, logout } =
    authSlice.actions;

export default authSlice.reducer;
