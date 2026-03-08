import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useInsertData } from "../../hooks/useInsertData";
import { useGetDataToken } from "../../hooks/useGetData";
import { useUpdatePassword } from "../../hooks/useUpdateData";

// Async thunks
export const createNewUser = createAsyncThunk(
    "auth/createNewUser",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await useInsertData(
                "/api/auth/register",
                formData,
            );
            return response;
        } catch (err) {
            return rejectWithValue(
                err?.response || {
                    message: err?.message || "Network Error",
                },
            );
        }
    },
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await useInsertData("/api/auth/login", formData);
            return response;
        } catch (err) {
            return rejectWithValue(
                err?.response || {
                    message: err?.message || "Network Error",
                },
            );
        }
    },
);

export const getLoggedUser = createAsyncThunk(
    "auth/getLoggedUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await useGetDataToken(`/api/users/getMe`);
            return response;
        } catch (err) {
            return rejectWithValue(
                err?.response || {
                    message: err?.message || "Network Error",
                },
            );
        }
    },
);

export const forgetPassword = createAsyncThunk(
    "auth/forgetPassword",
    async (data, { rejectWithValue }) => {
        try {
            const response = await useInsertData(
                `/api/auth/forgot-password`,
                data,
            );
            return response;
        } catch (err) {
            return rejectWithValue(
                err?.response || {
                    message: err?.message || "Network Error",
                },
            );
        }
    },
);

export const verifyResetCode = createAsyncThunk(
    "auth/verifyResetCode",
    async (data, { rejectWithValue }) => {
        try {
            const response = await useInsertData(
                `/api/auth/verify-reset-password`,
                data,
            );
            return response;
        } catch (err) {
            return rejectWithValue(
                err?.response || {
                    message: err?.message || "Network Error",
                },
            );
        }
    },
);

export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async (data, { rejectWithValue }) => {
        try {
            const response = await useUpdatePassword(
                `/api/auth/reset-password`,
                data,
            );
            return response;
        } catch (err) {
            return rejectWithValue(
                err?.response || {
                    message: err?.message || "Network Error",
                },
            );
        }
    },
);

// Initial state
const initialState = {
    createUser: [],
    loginUser: [],
    currentUser: [],
    forgetPassword: [],
    verifyResetCode: [],
    resetPassword: [],
    loading: false,
};

// Create slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Create New User
            .addCase(createNewUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(createNewUser.fulfilled, (state, action) => {
                state.loading = false;
                state.createUser = action.payload;
            })
            .addCase(createNewUser.rejected, (state, action) => {
                state.loading = false;
                state.createUser = action.payload;
            })
            // Login User
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.loginUser = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.loginUser = action.payload;
            })
            // Get Logged User
            .addCase(getLoggedUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getLoggedUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
            })
            .addCase(getLoggedUser.rejected, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
            })
            // Forget Password
            .addCase(forgetPassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(forgetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.forgetPassword = action.payload;
            })
            .addCase(forgetPassword.rejected, (state, action) => {
                state.loading = false;
                state.forgetPassword = action.payload;
            })
            // Verify Reset Code
            .addCase(verifyResetCode.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyResetCode.fulfilled, (state, action) => {
                state.loading = false;
                state.verifyResetCode = action.payload;
            })
            .addCase(verifyResetCode.rejected, (state, action) => {
                state.loading = false;
                state.verifyResetCode = action.payload;
            })
            // Reset Password
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.resetPassword = action.payload;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.resetPassword = action.payload;
            });
    },
});

export default authSlice.reducer;
