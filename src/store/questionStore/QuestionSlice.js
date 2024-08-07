import {createSlice} from "@reduxjs/toolkit";
import {
    CreateQuestion,
    ListQuestion,
    ListTeacherQuestion,
    SearchCategoryName,
    SearchQuestionName,
    SearchQuestions
} from "./QuestionAxios";

const initialState = {
    questions: [],
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
            .addCase(SearchQuestions.fulfilled , (state, action) => {
                state.questions = action.payload;
            })
            .addCase(ListTeacherQuestion.fulfilled, (state, action) => {
                state.questions = action.payload;
            })
    },
});

export default questionSlice.reducer;