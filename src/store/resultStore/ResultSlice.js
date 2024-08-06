import {endQuiz, startQuiz} from "./ResultAxios";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    results: [],
    loading: false,
    error: null,
};

const resultSlice = createSlice({
    name: 'results',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(startQuiz.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(startQuiz.fulfilled, (state, action) => {
                state.loading = false;
                state.results.push(action.payload);
            })
            .addCase(startQuiz.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(endQuiz.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(endQuiz.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.results.findIndex(r => r.id === action.payload.id);
                if (index !== -1) {
                    state.results[index] = action.payload;
                }
            })
            .addCase(endQuiz.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default resultSlice.reducer;