import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios-instance";

export const getCart = createAsyncThunk("cart/getData", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get(`cart`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const addCart = createAsyncThunk("cart/postData", async (bookId , { rejectWithValue }) => {
    // console.log(cart);
    console.log(bookId);
    // console.log(cart.qty);
    try {
        const { data } = await axiosInstance.post('cart',bookId)
        console.log(data);
        return data;
    } catch (error) {
        console.log(error.response);
        return rejectWithValue(error.response.data)
    }
});
export const updateCart = createAsyncThunk("cart/patchData", async (bookId , { rejectWithValue }) => {
    console.log(bookId);
    try {
        const { data } = await axiosInstance.patch('cart',bookId)
        console.log(data);
        return data;
    } catch (error) {
        console.log(error.response);
        return rejectWithValue(error.response.data)
    }
});

