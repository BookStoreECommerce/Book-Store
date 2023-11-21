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
    console.log(bookId);
    try {
      const { data } = await axiosInstance.post("cart", bookId);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
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
    return await axiosInstance
      .delete(`cart/${bookId.book}/${bookId.variation_name}`)
      .then(({ data }) => {
        console.log(data);
        return data;
      })
      .catch(({ response }) => {
        console.log(response.data);
        return rejectWithValue(response.data);
      });
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
    console.log(books);
    return await axiosInstance
      .post("cart/createCart", books)
      .then(({ data }) => data)
      .catch(({ response }) => rejectWithValue(response.data));
  }
);
