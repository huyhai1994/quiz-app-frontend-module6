import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axiosInstance  from '../utils/axiosConfig'

export const login = createAsyncThunk(
    '/api/auth/login',
    async (credential, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post('/api/auth/login', credential)
            localStorage.setItem('token', response.data)
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

    const authSlice = createSlice({
        name: 'auth',
        initialState: {
            token: localStorage.getItem('token') || null,
            isAuthenticated: !!localStorage.getItem('token'),
            loading: false,
            success: false,
            error: null,
        },
        reducers: {
            logout: (state) => {
                localStorage.removeItem('token')
                state.token = null
                state.isAuthenticated = false
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
                .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
                state.isAuthenticated = true;
                localStorage.setItem('token', action.payload);
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
        }
    })

export const {logout} = authSlice.actions;
export default authSlice.reducer
