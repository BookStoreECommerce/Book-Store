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

export const getCatBooksBySlug = createAsyncThunk("books/getCatBooksBySlug", async ({slug,page = 1,keyword}, { rejectWithValue }) => {
    try {
        if(keyword){
            const { data } = await axiosInstance.get(`book?category=${slug}&keyword=${keyword}`);
            return data
        }else{
            const { data } = await axiosInstance.get(`book?category=${slug}&page=${page}`);
      
            return data
        }
     
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


