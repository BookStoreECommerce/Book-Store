import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios-instance";

export const getAllReviews = createAsyncThunk("book/review", async (whislist, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get(`reviews`);
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
