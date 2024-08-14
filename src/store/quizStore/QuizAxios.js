import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const ApiURL = "http://localhost:8080/quiz";

export const ListQuiz = createAsyncThunk('listQuiz', async () => {
    const response = await axios.get(ApiURL + "/list");
    return response.data;
});

export const CreateQuiz = createAsyncThunk('createQuiz', async ({quiz, userId}) => {
    const response = await axios.post(`${ApiURL}/create`, quiz, {
        params: {userId}
    });
    return response.data;
});

export const UpdateQuiz = createAsyncThunk('updateQuiz', async ({id, quiz}) => {
    const response = await axios.put(ApiURL + "/update/" + id, quiz);
    return response.data;
});

export const DeleteQuiz = createAsyncThunk('deleteQuiz', async (id) => {
    await axios.delete(ApiURL + "/delete/" + id);
    return id;
});

export const ListTeacherQuizzes = createAsyncThunk('teacherQuiz/list', async (userId) => {
    const response = await axios.get(`${ApiURL}/list-teacher/${userId}`);
    return response.data;
});

export const AddQuestionsToQuiz = createAsyncThunk('addQuestionsToQuiz', async ({quizId, questionIds}) => {
    const response = await axios.post(`${ApiURL}/${quizId}/add-questions`, questionIds);
    return response.data;
});

export const ListQuizStudent = createAsyncThunk('listQuizStudent', async () => {
    const response = await axios.get(ApiURL + "/exam");
    return response.data;
});
