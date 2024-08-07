import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const ApiURL = "http://localhost:8080/role";

export const listRoles = createAsyncThunk('role/listRoles', async () => {
    const response = await axios.get(`${ApiURL}/list`);
    return response.data;
});

export const createRole = createAsyncThunk('role/createRole', async (role) => {
    const response = await axios.post(`${ApiURL}/create`, role);
    return response.data;
});

export const searchRoleByName = createAsyncThunk('role/searchRoleByName', async (name) => {
    const response = await axios.get(`${ApiURL}/search`, { params: { name } });
    return response.data;
});