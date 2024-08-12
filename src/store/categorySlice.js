import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_CATEGORIES_URL} from '../configs/backend.configs';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const response = await axios.get(API_CATEGORIES_URL);
    return response.data;
});

const categorySlice = createSlice({
    name: 'categories',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});

export default categorySlice.reducer;
