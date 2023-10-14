import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios-instance";

export const getAllBooks = createAsyncThunk(`books`, async (pageNumber=1, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get(`book?page=${pageNumber}`);
        return data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const getBooksByWord = createAsyncThunk(`searchBooks`, async ({pageNumber=1,searchKeyword=''}, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get(`book?keyword=${searchKeyword}&page=${pageNumber}`);
        return data
    } catch (error) {
        return rejectWithValue(error)
    }
})