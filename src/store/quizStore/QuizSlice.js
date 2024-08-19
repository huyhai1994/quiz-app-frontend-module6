import { createSlice } from "@reduxjs/toolkit";
import {
    AddQuestionsToQuiz,
    CreateQuiz,
    DeleteQuiz,
    ListQuiz,
    ListQuizStudent,
    ListTeacherQuizzes,
    UpdateQuiz,
    fetchTopQuizzes, fetchHistoryUserByQuizId
} from "./QuizAxios";

const initialState = {
    quizzes: [],
    topQuizzes: [],
    loading: false,
    error: null,
    status: 'idle',
    quizTeacherHistory: [],
};

const quizSlice = createSlice({
    name: 'quizzes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(ListQuiz.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ListQuiz.fulfilled, (state, action) => {
                state.loading = false;
                state.quizzes = action.payload;
            })
            .addCase(ListQuiz.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(CreateQuiz.fulfilled, (state, action) => {
                state.quizzes.push(action.payload);
            })
            .addCase(UpdateQuiz.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(UpdateQuiz.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.quizzes.findIndex(quiz => quiz.quizzesId === action.payload.quizzesId);
                if (index !== -1) {
                    state.quizzes[index] = action.payload;
                }
            })
            .addCase(UpdateQuiz.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(DeleteQuiz.fulfilled, (state, action) => {
                state.quizzes = state.quizzes.filter(q => q.id !== action.payload);
            })
            .addCase(ListTeacherQuizzes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(ListTeacherQuizzes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.quizzes = action.payload;
            })
            .addCase(ListTeacherQuizzes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(AddQuestionsToQuiz.fulfilled, (state, action) => {
                state.quizzes = action.payload;
            })
            .addCase(ListQuizStudent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ListQuizStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.quizzes = action.payload;
            })
            .addCase(ListQuizStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchTopQuizzes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTopQuizzes.fulfilled, (state, action) => {
                state.loading = false;
                state.topQuizzes = action.payload;
            })
            .addCase(fetchTopQuizzes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchHistoryUserByQuizId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHistoryUserByQuizId.fulfilled, (state, action) => {
                state.loading = false;
                state.quizTeacherHistory = action.payload;
            })
            .addCase(fetchHistoryUserByQuizId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default quizSlice.reducer;
