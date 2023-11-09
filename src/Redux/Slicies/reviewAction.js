import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios-instance";

export const addReview = createAsyncThunk("book/review", async (reviewData, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.post(`reviews`, reviewData);
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
