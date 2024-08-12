import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const createQuiz = createAsyncThunk('quiz/createQuiz', async (quizData) => {
    const response = await axios.post('/quizz/create', quizData);
    /*TODO: nho sua lai URL*/
    return response.data;
});

const quizSlice = createSlice({
    name: 'quiz',
    initialState: {status: 'idle', error: null},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createQuiz.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createQuiz.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(createQuiz.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default quizSlice.reducer;
