import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios-instance";
import { setBooks } from "./bookSlice";

export const booksFilter = createAsyncThunk("booksFilter", async (languagesFilter, { rejectWithValue, dispatch, getState }) => {
    try {
        const { data } = await axiosInstance.get(`book?${languagesFilter}&page=1`);
        dispatch(setBooks({books: data.result, totalCount: data.totalCount}))
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})