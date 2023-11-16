import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios-instance";

// all cart function with token
export const getCart = createAsyncThunk(
  "cart/getData",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`cart`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addCartWithToken = createAsyncThunk(
  "cart/addWithToken",
  async (bookId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("cart", bookId);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCart = createAsyncThunk(
  "cart/patchData",
  async ({ book, qty }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch("cart", { book, qty });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (bookId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`cart/${bookId.book}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`cart`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const addCartWithCoupon = createAsyncThunk("cart/addWithCoupon", async (bookId, { rejectWithValue }) => {
//     try {
//         const { data } = await axiosInstance.post('cart', bookId)
//         return data;
//     } catch (error) {
//         return rejectWithValue(error.response.data)
//     }
// });

export const createCart = createAsyncThunk(
  "cart/createCart",
  async (books, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("cart/creatCart", books);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



//ElAgouz
export const addCoupon = createAsyncThunk("cart/addCoupon", async (code, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.patch('cart/coupon', {code});
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});
export const removeCoupon = createAsyncThunk("cart/removeCoupon", async (code, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.delete(`cart/coupon/${code}`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});