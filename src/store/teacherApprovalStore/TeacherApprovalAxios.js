import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const ApiURL = "http://localhost:3000/teacher-approvals";

export const listTeacherApprovals = createAsyncThunk('teacherApproval/listTeacherApprovals', async () => {
    const response = await axios.get(`${ApiURL}/list`);
    return response.data;
});

export const listPendingApprovals = createAsyncThunk('teacherApproval/listPendingApprovals', async () => {
    const response = await axios.get(`${ApiURL}/pending`);
    return response.data;
});

export const listApprovedApprovals = createAsyncThunk('teacherApproval/listApprovedApprovals', async () => {
    const response = await axios.get(`${ApiURL}/approved`);
    return response.data;
});