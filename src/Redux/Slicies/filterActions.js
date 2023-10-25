import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios-instance";
import { setBooks } from "./bookSlice";

export const booksFilter = createAsyncThunk("booksFilter", async (filter, { rejectWithValue, dispatch }) => {
    try {
        console.log(filter);
        const { data } = await axiosInstance.get(`book?${filter}&page=1`);
        dispatch(setBooks({books: data.result, totalCount: data.totalCount}))
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const getAllAuthors = createAsyncThunk("getAllAuthors", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get(`book/author`);
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})