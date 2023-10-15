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

export const setFavCategories = createAsyncThunk("users/add-to-fav-cats", async (chosenFavCategory, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.patch(`users/add-to-fav-cats`, {'favorits': chosenFavCategory});
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})