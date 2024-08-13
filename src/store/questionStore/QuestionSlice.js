import { createSlice } from "@reduxjs/toolkit";
import {
    CreateQuestion, GetQuestionsByCategoryName, getQuestionsByQuizId,
    ListQuestion,
    ListTeacherQuestion,
    SearchQuestions
} from "./QuestionAxios";

const initialState = {
    questions: [],
    status: 'idle',
    error: null,
};

const questionSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(ListQuestion.fulfilled, (state, action) => {
                state.questions = action.payload;
            })
            .addCase(CreateQuestion.fulfilled, (state, action) => {
                state.questions.push(action.payload);
            })
            .addCase(SearchQuestions.fulfilled, (state, action) => {
                state.questions = action.payload;
            })
            .addCase(ListTeacherQuestion.fulfilled, (state, action) => {
                state.questions = action.payload;
            })
            .addCase(GetQuestionsByCategoryName.fulfilled, (state, action) => {
                state.questions = action.payload;
            })
            .addCase(getQuestionsByQuizId.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getQuestionsByQuizId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.questions = action.payload;
            })
            .addCase(getQuestionsByQuizId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default questionSlice.reducer;
