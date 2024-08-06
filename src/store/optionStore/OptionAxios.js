import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const ApiURL = "http://localhost:3000/option";

export const CreateOption = createAsyncThunk('listOption', async (option) => {
    const response = await axios.post(ApiURL + "/create", option);
    return response.data;
})