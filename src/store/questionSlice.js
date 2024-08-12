import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_QUESTION_URL} from '../configs/backend.configs';

export const fetchQuestions = createAsyncThunk('questions/fetchQuestions', async () => {
    const response = await axios.get(API_QUESTION_URL + '/list');
    return response.data;
});

const questionSlice = createSlice({
    name: 'questions',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchQuestions.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});

export default questionSlice.reducer;
