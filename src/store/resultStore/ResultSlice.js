import {createSlice} from "@reduxjs/toolkit";
import {
    endQuizForUser,
    fetchQuiz,
    fetchQuizResultsByUserId,
    HistoryResultsByUserId,
    ResultDetailHistory,
    startQuizForUser
} from "./ResultAxios";


const initialState = {
    results: [],
    currentQuiz: null,
    loading: false,
    error: null,
    history: [],
    status: 'idle'
};

const resultSlice = createSlice({
    name: 'results',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(startQuizForUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(startQuizForUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentQuiz = action.payload;
            })
            .addCase(startQuizForUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(endQuizForUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(endQuizForUser.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(endQuizForUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchQuizResultsByUserId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchQuizResultsByUserId.fulfilled, (state, action) => {
                state.loading = false;
                state.results = action.payload;
            })
            .addCase(fetchQuizResultsByUserId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(HistoryResultsByUserId.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(HistoryResultsByUserId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.history = action.payload;
            })
            .addCase(HistoryResultsByUserId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchQuiz.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchQuiz.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.quiz = action.payload;
            })
            .addCase(fetchQuiz.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(ResultDetailHistory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(ResultDetailHistory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.quiz = action.payload;
            })
            .addCase(ResultDetailHistory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default resultSlice.reducer;
