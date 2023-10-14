import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios-instance";

export const getCategories = createAsyncThunk("/categories",async ({page = 1 , searchTerm  } , { rejectWithValue })=>{
// let kword= searchTerm || "history";
// console.log(searchTerm);
    try {
        if(searchTerm){
            const {data} = await axiosInstance.get(`category?keyword=${searchTerm}`);
            return data;

        }
        else {
            const {data} = await axiosInstance.get(`category?page=${page}`);
            return data;
        }
        
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})