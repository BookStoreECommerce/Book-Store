import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios-instance";

export const getCategories = createAsyncThunk("/categories",async (page = 1 , { rejectWithValue })=>{

    try {
        const {data} = await axiosInstance.get(`category?page=${page}`);
        return data;
        
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})