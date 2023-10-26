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


export const addCart = createAsyncThunk("cart/postData", async (bookId, { rejectWithValue }) => {
    console.log(bookId);
    try {
        const { data } = await axiosInstance.post('cart', bookId)
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

export const updateCart = createAsyncThunk("cart/patchData", async (bookId, { rejectWithValue }) => {
    console.log(bookId);
    try {
        const { data } = await axiosInstance.patch('cart', bookId)
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

export const deleteCartItem = createAsyncThunk("cart/deleteCartItem", async (bookId, { rejectWithValue }) => {
    console.log(bookId);
    try {
        const { data } = await axiosInstance.delete(`cart/${bookId.book}`)
        console.log(data);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

export const clearCart = createAsyncThunk("cart/clearCart", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.delete(`cart`)
        console.log(data);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});