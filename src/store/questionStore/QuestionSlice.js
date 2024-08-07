import {createSlice} from "@reduxjs/toolkit";
import {CreateQuestion, ListQuestion} from "./QuestionAxios";

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
            });
    },
});

export default questionSlice.reducer;