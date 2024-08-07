import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ApiURL = "http://localhost:8080/teacher-approvals";

// Thunk để lấy danh sách tất cả các teacher approvals
export const listTeacherApprovals = createAsyncThunk(
    'teacherApproval/listTeacherApprovals',
    async () => {
        try {
            const response = await axios.get(`${ApiURL}/list`);
            return response.data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

// Thunk để lấy danh sách tất cả các pending approvals
export const listPendingApprovals = createAsyncThunk(
    'teacherApproval/listPendingApprovals',
    async () => {
        try {
            const response = await axios.get(`${ApiURL}/pending`);
            return response.data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

// Thunk để lấy danh sách tất cả các approved approvals
export const listApprovedApprovals = createAsyncThunk(
    'teacherApproval/listApprovedApprovals',
    async () => {
        try {
            const response = await axios.get(`${ApiURL}/approved`);
            return response.data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

// Thunk để tìm kiếm approved approvals theo tên và email
export const searchApprovedApprovals = createAsyncThunk(
    'teacherApproval/searchApprovedApprovals',
    async ({ userName, userEmail }) => {
        try {
            const response = await axios.get(`${ApiURL}/search/approved`, {
                params: { userName, userEmail }
            });
            return response.data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
);
