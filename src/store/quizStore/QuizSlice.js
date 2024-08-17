import {createSlice} from "@reduxjs/toolkit";
import {
    AddQuestionsToQuiz,
    CreateQuiz,
    DeleteQuiz,
    fetchQuizHistoryByTeacher,
    fetchTopQuizzes,
    ListQuiz,
    ListQuizStudent,
    ListTeacherQuizzes,
    UpdateQuiz
} from "./QuizAxios";

const initialState = {
    quizzes: [],
    topQuizzes: [],
    loading: false,
    error: null,
    status: 'idle',
    historyTeacher: [],
};

const quizSlice = createSlice({
    name: 'quizzes',
    initialState,
    reducers: {
        updateQuizInList: (state, action) => {
            const updatedQuiz = action.payload;
            const index = state.quizzes.findIndex(quiz => quiz.quizzesId === updatedQuiz.quizzesId);
            if (index !== -1) {
                state.quizzes[index] = {...state.quizzes[index], ...updatedQuiz};
            }
        },
    },
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
                const updatedQuiz = action.payload;
                const index = state.quizzes.findIndex(quiz => quiz.quizzesId === updatedQuiz.quizzesId);
                if (index !== -1) {
                    state.quizzes[index] = {...state.quizzes[index], ...updatedQuiz};
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
            .addCase(fetchQuizHistoryByTeacher.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchQuizHistoryByTeacher.fulfilled, (state, action) => {
                state.loading = false;
                state.historyTeacher = action.payload;
            })
            .addCase(fetchQuizHistoryByTeacher.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {updateQuizInList} = quizSlice.actions;
export default quizSlice.reducer;
