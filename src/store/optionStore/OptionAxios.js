import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const ApiURL = "http://localhost:8080/option";

export const CreateOption = createAsyncThunk('listOption', async (option, {rejectWithValue}) => {
    try {
        const response = await axios.post(ApiURL + "/create", option);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data);
        } else {
            return rejectWithValue("Đã xảy ra lỗi");
        }
    }
});

export const fetchOptionsByQuestionId = createAsyncThunk(
    'options/fetchOptionsByQuestionId',
    async (questionId) => {
        const response = await axios.get(`${ApiURL}/question`, {
            params: { questionId }
        });
        return response.data;
    }
);