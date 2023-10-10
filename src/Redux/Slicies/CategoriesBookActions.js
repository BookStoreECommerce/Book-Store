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

export const getCatBooksBySlug = createAsyncThunk("books/getCatBooksBySlug", async ({slug,page}, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get(`book/category?slug=${slug}&page=${page}`);
      
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const getBooksByWord = createAsyncThunk("books/getBooksByWord", async ({slug,keyword}, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get(`book/category?slug=${slug}&keyword=${keyword}`);
      
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})