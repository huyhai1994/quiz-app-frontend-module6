import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const ApiURL = "http://localhost:8080/result";


export const startQuizForUser = createAsyncThunk(
    'result/startQuizForUser',
    async ({userId, quizId}) => {
        const response = await axios.post(`${ApiURL}/start/${userId}/${quizId}`);
        console.log(response.data)
        return response.data;
    }
);


export const endQuizForUser = createAsyncThunk(
    'result/endQuizForUser',
    async ({resultId, userAnswers}) => {
        try {
            console.log('EndQuizForUser: ', resultId, userAnswers);
            const response = await axios.post(`${ApiURL}/end/${resultId}`, userAnswers);
            return response.data;
        } catch (error) {
            console.error('Error in endQuizForUser:', error.response || error.message);
            throw error;
        }
    }
);


export const fetchQuizResultsByUserId = createAsyncThunk(
    'result/fetchQuizResultsByUserId',
    async (resultId) => {
        const response = await axios.get(`${ApiURL}/${resultId}`);
        return response.data;
    }
);

export const HistoryResultsByUserId = createAsyncThunk(
    'result/fetchQuizHistoryByUserId',
    async (userId) => {
        const response = await axios.get(`${ApiURL}/history/${userId}`);
        return response.data;
    }
);

export const fetchQuiz = createAsyncThunk('quiz/fetchQuiz', async (quizId, {rejectWithValue}) => {
    try {
        const response = await axios.get(`${ApiURL}/quizzes/${quizId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching quiz:', error);
        return rejectWithValue(error.response.data);
    }
});

export const ResultDetailHistory = createAsyncThunk(
    'result/detail/history',
    async (id) => {
        const response = await axios.get(`${ApiURL}/detail/${id}/history`);
        return response.data;
    }
);
