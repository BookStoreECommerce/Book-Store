import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios-instance";

export const getWhishList = createAsyncThunk("users/wishList", async (whislist, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.post(`users/wishList`, {'book': whislist});
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const getWhishListBooks = createAsyncThunk(`books`, async (_, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get(`book`);
        return data
    } catch (error) {
        return rejectWithValue(error)
    }
  }
);