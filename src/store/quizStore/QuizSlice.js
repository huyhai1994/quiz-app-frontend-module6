import {createSlice} from "@reduxjs/toolkit";
import {CreateQuiz, DeleteQuiz, ListQuiz, ListTeacherQuizzes, UpdateQuiz} from "./QuizAxios";


const initialState = {
    quizzes: [],
    loading: false,
    error: null,
    status: 'idle',
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
            .addCase(UpdateQuiz.fulfilled, (state, action) => {
                const index = state.quizzes.findIndex(q => q.id === action.payload.id);
                if (index !== -1) {
                    state.quizzes[index] = action.payload;
                }
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
            });
    },
});

export default quizSlice.reducer;