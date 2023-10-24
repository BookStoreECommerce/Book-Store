import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios-instance";

export const getCart = createAsyncThunk("/cart", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get(`cart`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const addCart = createAsyncThunk("cart", async (bookId, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.post('cart', bookId)
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

getCart();