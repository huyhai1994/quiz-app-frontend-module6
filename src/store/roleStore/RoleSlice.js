import {createSlice} from "@reduxjs/toolkit";
import {createRole, listRoles, searchRoleByName} from "./RoleAxios";

const initialState = {
    roles: [],
    loading: false,
    error: null,
};

const roleSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(listRoles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(listRoles.fulfilled, (state, action) => {
                state.loading = false;
                state.roles = action.payload;
            })
            .addCase(listRoles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createRole.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createRole.fulfilled, (state, action) => {
                state.loading = false;
                state.roles.push(action.payload);
            })
            .addCase(createRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(searchRoleByName.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchRoleByName.fulfilled, (state, action) => {
                state.loading = false;
                state.roles = action.payload;
            })
            .addCase(searchRoleByName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default roleSlice.reducer;