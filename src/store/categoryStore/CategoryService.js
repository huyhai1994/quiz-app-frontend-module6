import {createSlice} from "@reduxjs/toolkit";
import {CreateCategory, DeleteCategory, GetCategoryByName, ListCategory, UpdateCategory} from "./CategoryAxios";


const inittial = {
    category: []
}

const categorySlice = createSlice({
    name: 'categories',
    initialState: inittial,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(ListCategory.fulfilled, (state, action) => {
                state.category = action.payload;
            })
            .addCase(CreateCategory.fulfilled, (state, action) => {
                state.category.push(action.payload);
            })
            .addCase(UpdateCategory.fulfilled, (state, action) => {
                const index = state.category.findIndex(c => c.id === action.payload.id);
                if (index !== -1) {
                    state.category[index] = action.payload;
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
            .addCase(DeleteCategory.fulfilled, (state, action) => {
                const index = state.category.findIndex(c => c.id === action.payload.id);
                if (index !== -1) {
                    state.category.splice(index, 1);
                }
            })
    }
})

export default categorySlice.reducer;
