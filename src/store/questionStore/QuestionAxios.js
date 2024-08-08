import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const ApiURL = "http://localhost:8080/question";

export const ListQuestion = createAsyncThunk('listQuestion', async () => {
    const response = await axios.get(ApiURL + "/list");
    return response.data;
});

export const CreateQuestion = createAsyncThunk('createQuestion', async (question) => {
    const response = await axios.post(ApiURL + "/create", question);
    return response.data;
});

export const SearchQuestions = createAsyncThunk('searchQuestions', async (searchTerm) => {
    const response = await axios.get(`${ApiURL}/search/questions`, {
        params: { searchTerm }
    });
    return response.data;
});

export const ListTeacherQuestion = createAsyncThunk('teacherQuestion/list', async (userId) => {
    const response = await axios.get(`${ApiURL}/list-teacher/${userId}`);
    return response.data;
});