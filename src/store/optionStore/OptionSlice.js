import {createSlice} from "@reduxjs/toolkit";
import {CreateOption} from "./OptionAxios";

const inittial = {
    options: []
}

const optionSlice = createSlice({
    name: 'options',
    initialState: inittial,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(CreateOption.fulfilled, (state, action) => {
                state.options.push(action.payload)
            });
    }
})

export default optionSlice.reducer;