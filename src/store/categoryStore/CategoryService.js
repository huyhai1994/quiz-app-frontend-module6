import { createSlice } from "@reduxjs/toolkit";
import {
    CreateCategory,
    DeleteCategory,
    GetCategoriesByUserId,
    GetCategoryByName,
    UpdateCategory
} from "./CategoryAxios";

const initialState = {
    category: [],
    loading: false,
    error: null,
};

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(CreateCategory.fulfilled, (state, action) => {
                state.category.push(action.payload);
            })
            .addCase(UpdateCategory.fulfilled, (state, action) => {
                const index = state.category.findIndex(c => c.id === action.payload.id);
                if (index !== -1) {
                    state.category[index] = action.payload;
                }
            })
            .addCase(DeleteCategory.fulfilled, (state, action) => {
                const index = state.category.findIndex(c => c.id === action.payload.id);
                if (index !== -1) {
                    state.category.splice(index, 1);
                }
            })
            .addCase(GetCategoryByName.fulfilled, (state, action) => {
                const category = state.category.find(c => c.name === action.payload.name);
                if (category) {
                    state.category = [category];
                } else {
                    state.category = [];
                }
            })
            .addCase(GetCategoriesByUserId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetCategoriesByUserId.fulfilled, (state, action) => {
                state.category = action.payload;
                state.loading = false;
            })
            .addCase(GetCategoriesByUserId.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export default categorySlice.reducer;
