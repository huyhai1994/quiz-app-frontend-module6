import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import instance from "../../utils/axiosConfig";

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
        params: {searchTerm}
    });
    return response.data;
});

export const ListTeacherQuestion = createAsyncThunk('teacherQuestion/list', async (userId) => {
    const response = await axios.get(`${ApiURL}/list-teacher/${userId}`);
    return response.data;
});

export const GetQuestionsByCategoryName = createAsyncThunk('getQuestionsByCategoryName', async ({
                                                                                                    categoryName, userId
                                                                                                }) => {
    const response = await axios.get(`${ApiURL}/category/${categoryName}`, {
        params: {userId}
    });
    return response.data;
});

export const getQuestionsByQuizId = createAsyncThunk('questions/getByQuizId', async (quizId) => {
    const response = await axios.get(`${ApiURL}/quiz/${quizId}`);
    return response.data;
});

export const DeleteQuestion = createAsyncThunk('questions/delete', async (id, {rejectWithValue}) => {
    try {
        await instance.delete(`/question/${id}`);
        return id
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})
