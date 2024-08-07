import {createSlice} from "@reduxjs/toolkit";
import {deleteUser, requestTeacherRole} from "./UserAxios";

const initialState = {
    users: [],
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter(user => user.id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(requestTeacherRole.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(requestTeacherRole.fulfilled, (state, action) => {
                state.loading = false;
                // Cập nhật trạng thái nếu cần
            })
            .addCase(requestTeacherRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default userSlice.reducer;