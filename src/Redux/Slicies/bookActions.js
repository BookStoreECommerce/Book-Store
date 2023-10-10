import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios-instance";


export const getAllBooks = createAsyncThunk(`books`, async ({pageNumber, searchWord=''}, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get(`book?page=${pageNumber}&keyword=${searchWord}`);
        return data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error)
    }
})


export const getBooksByWord = createAsyncThunk(`books`, async (word, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get(`book?keyword=${word}`);
        console.log(data);
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})