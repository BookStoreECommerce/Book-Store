import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios-instance";


export const getAllBooks = createAsyncThunk(`books`, async (page, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get(`book?page=${page}`);
        console.log(data);
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const getBooksByWord = createAsyncThunk(`books/getData`, async (word, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get(`book?keyword=${word}`);
        console.log(data);
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const getNewBooks = createAsyncThunk(`books/newBooks`, async (_, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get(`book?sort=published`);
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})