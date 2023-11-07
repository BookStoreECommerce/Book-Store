import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios-instance";

// all cart function with token 
export const getCart = createAsyncThunk("cart/getData", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get(`cart`);
        console.log(data);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const addCartWithToken = createAsyncThunk("cart/addWithToken", async (bookId, { rejectWithValue }) => {
    try {
        console.log(bookId);
        const { data } = await axiosInstance.post('cart', bookId)
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

export const updateCart = createAsyncThunk("cart/patchData", async ({book,qty}, { rejectWithValue }) => {
    try {
        console.log(book);
        console.log(qty);
        const { data } = await axiosInstance.patch('cart', {book,qty})
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

export const addCoupon = createAsyncThunk("cart/coupon", async (code, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.patch('cart/coupon', {code});
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});
export const removeCoupon = createAsyncThunk("cart/coupon", async (code, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.patch('cart/coupon', {code});
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

export const deleteCartItem = createAsyncThunk("cart/deleteCartItem", async (bookId, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.delete(`cart/${bookId.book}`)
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

export const clearCart = createAsyncThunk("cart/clearCart", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.delete(`cart`)
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});


// export const addCartWithCoupon = createAsyncThunk("cart/addWithCoupon", async (bookId, { rejectWithValue }) => {
//     try {
//         console.log(bookId);
//         const { data } = await axiosInstance.post('cart', bookId)
//         return data;
//     } catch (error) {
//         return rejectWithValue(error.response.data)
//     }
// });