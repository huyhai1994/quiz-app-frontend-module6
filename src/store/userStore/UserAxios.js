import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const ApiURL = "http://localhost:8080/users";

export const deleteUser = createAsyncThunk('deleteUser', async (id) => {
    await axios.delete(`${ApiURL}/delete/${id}`);
    return id;
});

export const requestTeacherRole = createAsyncThunk('requestTeacherRole', async (id) => {
    await axios.post(`${ApiURL}/request-teacher/${id}`);
    return id;
});

export const getUser = createAsyncThunk('getUser', async (id) => {
    const response = await axios.get(`${ApiURL}/profile`);
    console.log(response.data)
    return response.data;
});