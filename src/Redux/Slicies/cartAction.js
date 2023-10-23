import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios-instance";

export const getCart = createAsyncThunk("/cart",async ({page = 1 , searchTerm  } , { rejectWithValue })=>{
// let kword= searchTerm || "history";
    try {
        
            const {data} = await axiosInstance.get(`cart`);
            console.log(data);
            return data;


       
        
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

getCart();