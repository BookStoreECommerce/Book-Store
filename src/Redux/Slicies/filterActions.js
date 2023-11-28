import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios-instance";
import store from "../Store";
import { setBooks } from "./bookSlice";

export const booksFilter = createAsyncThunk("booksFilter", async ({ pageNumber, filter }, {rejectWithValue, dispatch}) => {
    try {
        const { booksFilter } = store.getState()
        if (filter === '' && booksFilter.sort !== '') {
            filter = `sort=${booksFilter.sort}`
        } else if (filter !== '' && booksFilter.sort !== '') {
            filter += `&sort=${booksFilter.sort}`
        }
        console.log(`book?${filter}&page=${pageNumber}`);
        const { data } = await axiosInstance.get(`book?${filter}&page=${pageNumber}`);
        dispatch(setBooks({ books: data.result, totalCount: data.totalCount }))
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const getAllAuthors = createAsyncThunk("getAllAuthors", async (_, {rejectWithValue}) => {
    try {
        const { data } = await axiosInstance.get(`book/author`);
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})