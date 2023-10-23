import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios-instance";

export const booksFilter = createAsyncThunk("booksFilter", async (languagesFilter, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get(`book?${languagesFilter}`);
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})