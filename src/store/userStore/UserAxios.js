import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const ApiURL = "http://localhost:3000/user";

export const deleteUser = createAsyncThunk('deleteUser', async (id) => {
    await axios.delete(`${ApiURL}/delete/${id}`);
    return id;
});

export const requestTeacherRole = createAsyncThunk('requestTeacherRole', async (id) => {
    await axios.post(`${ApiURL}/request-teacher/${id}`);
    return id;
});