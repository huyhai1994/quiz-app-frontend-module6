import {createSlice} from "@reduxjs/toolkit";
import {CreateOption, fetchOptionsByQuestionId} from "./OptionAxios";

const initialState = {
    options: [],
    status: 'idle',
    error: null,
};

const optionSlice = createSlice({
    name: 'options',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(CreateOption.fulfilled, (state, action) => {
                state.options.push(action.payload);
                state.error = null;
            })
            .addCase(CreateOption.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(fetchOptionsByQuestionId.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOptionsByQuestionId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.options = action.payload;
            })
            .addCase(fetchOptionsByQuestionId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default optionSlice.reducer;
