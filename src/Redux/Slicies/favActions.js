import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios-instance";

export const getAllCategories = createAsyncThunk("category", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get(`category`);
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})