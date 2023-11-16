import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios-instance";
import { setBooks } from "./bookSlice";

export const booksFilter = createAsyncThunk("booksFilter", async ({pageNumber, filter}, { rejectWithValue, dispatch }) => {
    try {
        if(filter.includes('rate')) {
            filter += `&sort=-rating`
        }
        // console.log('filter', filter);
        const { data } = await axiosInstance.get(`book?${filter}&page=${pageNumber}`);
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