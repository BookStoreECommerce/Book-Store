import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios-instance";

export const getCatBooks = createAsyncThunk("books/getCatBooks", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get(`category`);
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const getCatBooksBySlug = createAsyncThunk("books/getCatBooksBySlug", async (slug, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get(`books/category?category=${slug}`);
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})