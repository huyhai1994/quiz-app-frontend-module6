import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const ApiURL = "http://localhost:3000/category";

export const ListCategory = createAsyncThunk('listCategory', async () => {
    const response = await axios.get(ApiURL + "/list");
    return response.data;
})

export const CreateCategory = createAsyncThunk('createCategory', async (category) => {
    const response = await axios.post(ApiURL + "/create", category);
    return response.data;
});

export const UpdateCategory = createAsyncThunk('updateCategory', async (category) => {
    const response = await axios.put(ApiURL + "/update/" + category.id, category);
    return response.data;
});

export const DeleteCategory = createAsyncThunk('deleteCategory', async (id) => {
    await axios.delete(ApiURL + "/delete/" + id);
    return id;
});

export const GetCategoryByName = createAsyncThunk('getCategoryByName', async (name) => {
    const response = await axios.get(ApiURL + "/search/" + name);
    return response.data;
});