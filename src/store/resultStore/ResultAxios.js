import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const ApiURL = "http://localhost:8080/result";

export const startQuiz = createAsyncThunk('result/startQuiz', async ({ userId, quizId }) => {
    const response = await axios.post(`${ApiURL}/start/${userId}/${quizId}`);
    return response.data;
});

export const endQuiz = createAsyncThunk('result/endQuiz', async (resultId) => {
    const response = await axios.post(`${ApiURL}/end/${resultId}`);
    return response.data;
});