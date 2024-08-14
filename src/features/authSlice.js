import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosInstance from '../utils/axiosConfig'

export const login = createAsyncThunk(
    '/api/auth/login',
    async (credential, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post('/api/auth/login', credential)
            localStorage.setItem('token', response.data)
            localStorage.setItem('role', response.data.role);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
)

export const register = createAsyncThunk(
    '/api/auth/register',
    async (userData, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post('/api/auth/register', userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
)

export const changePassword = createAsyncThunk(
    '/users/change-password',
    async (passwordData, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post('/users/change-password', passwordData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
)

export const updateUserProfile = createAsyncThunk(
    '/users/profile',
    async (profileData, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.put('/users/profile', profileData, {
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'multipart/form-data',
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
)

export const logout = createAsyncThunk(
    'api/auth/logout',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post('/api/auth/logout');
            localStorage.removeItem('token');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'An error occurred')
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token') || null,
        isAuthenticated: !!localStorage.getItem('token'),
        loading: false,
        success: false,
        error: null,
        user: null,
        role: localStorage.getItem('role') || null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.role = action.payload.role
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('role', action.payload.role)
                localStorage.setItem('userId', action.payload.userId);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            })
            .addCase(changePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logout.pending, (state) => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.token = null;
                state.isAuthenticated = false;
                state.user = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default authSlice.reducer
