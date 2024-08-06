import {createSlice} from "@reduxjs/toolkit";
import {CreateQuiz, DeleteQuiz, ListQuiz, UpdateQuiz} from "./QuizAxios";


const initialState = {
    quizzes: [],
    loading: false,
    error: null,
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
            });
    },
});

export default quizSlice.reducer;