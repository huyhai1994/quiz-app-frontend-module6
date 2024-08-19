import {createSlice} from "@reduxjs/toolkit";
import {
    listApprovedApprovals,
    listPendingApprovals,
    listTeacherApprovals,
    searchApprovedApprovals
} from "./TeacherApprovalAxios";

const initialState = {
    teacherApprovals: [],
    pendingApprovals: [],
    approvedApprovals: [],
    loading: false,
    error: null,
};

const teacherApprovalSlice = createSlice({
    name: 'teacherApprovals',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(listTeacherApprovals.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(listTeacherApprovals.fulfilled, (state, action) => {
                state.loading = false;
                state.teacherApprovals = action.payload;
            })
            .addCase(listTeacherApprovals.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })


            .addCase(listPendingApprovals.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(listPendingApprovals.fulfilled, (state, action) => {
                state.loading = false;
                state.pendingApprovals = action.payload;
            })
            .addCase(listPendingApprovals.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })


            .addCase(listApprovedApprovals.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(listApprovedApprovals.fulfilled, (state, action) => {
                state.loading = false;
                state.approvedApprovals = action.payload;
            })
            .addCase(listApprovedApprovals.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })


            .addCase(searchApprovedApprovals.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchApprovedApprovals.fulfilled, (state, action) => {
                state.loading = false;
                state.approvedApprovals = action.payload;
            })
            .addCase(searchApprovedApprovals.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default teacherApprovalSlice.reducer;
