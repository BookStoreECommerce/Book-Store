import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios-instance";

export const getAllBooks = createAsyncThunk(`books`, async (pageNumber=1, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get(`book?page=${pageNumber}`);
        return data
    } catch (error) {
        return rejectWithValue(error)
    }
  }
);

export const getBooksByWord = createAsyncThunk(`searchBooks`, async ({pageNumber=1,searchKeyword=''}, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get(`book?keyword=${searchKeyword}&page=${pageNumber}`);
        return data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const getBookBySlug = createAsyncThunk(
  "books/id",
  async (slug, { rejectWithValue }) => {
    return axiosInstance.get(`book/${slug}`).then(({data}) =>  data ).catch(({response}) => rejectWithValue(response.data));
  }
);

export const getNewBooks = createAsyncThunk(`books/newBooks`, async (_, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get(`book?sort=-published`);
        return data.result
    } catch (error) {
        return rejectWithValue(error)
    }
})