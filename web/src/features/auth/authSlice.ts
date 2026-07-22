import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { PublicUser } from "../../../../shared/types";

type AuthStatus =
    | "initializing"
    | "idle"
    | "loading"
    | "authenticated"
    | "error";

interface AuthState {
    token: string | null;
    user: PublicUser | null;
    status: AuthStatus;
    error: string | null;
}

const initialState: AuthState = {
    token: null,
    user: null,
    status: "initializing",
    error: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Rehydrates a persisted session (token + user) on app start.
        restoreSession: (
            state,
            action: PayloadAction<{ token: string; user: PublicUser }>,
        ) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.status = "authenticated";
        },
        // Marks app startup as done when there is no persisted session to restore.
        initFinished: (state) => {
            state.status = "idle";
        },
        loginStart: (state) => {
            state.status = "loading";
            state.error = null;
        },
        loginSuccess: (
            state,
            action: PayloadAction<{ token: string; user: PublicUser }>,
        ) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
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

export const {
    restoreSession,
    initFinished,
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
} = authSlice.actions;

export default authSlice.reducer;
