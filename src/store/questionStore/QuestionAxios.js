import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const ApiURL = "http://localhost:3000/question";

export const ListQuestion = createAsyncThunk('listQuestion', async () => {
    const response = await axios.get(ApiURL + "/list");
    return response.data;
});

export const CreateQuestion = createAsyncThunk('createQuestion', async (question) => {
    const response = await axios.post(ApiURL + "/create", question);
    return response.data;
});