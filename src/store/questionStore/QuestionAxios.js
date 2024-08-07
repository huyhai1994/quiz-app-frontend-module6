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

export const SearchQuestions = createAsyncThunk('searchQuestions', async({ category, question }) => {
    const response = await axios.get(`${ApiURL}/search/questions?categoryName=${category}&questionName=${question}`);
    return response.data;
})