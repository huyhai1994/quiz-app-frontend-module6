import {createSlice} from "@reduxjs/toolkit";
import {CreateOption} from "./OptionAxios";

const initialState = {
    options: [],
    error: null
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
            });
    }
});

export default optionSlice.reducer;
