import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios-instance";
import { addTobookReviews, removeFromBookReviews } from "./bookSlice";

export const addReview = createAsyncThunk("book/review", async ({content,rating,book}, { rejectWithValue, dispatch }) => {

    try {
        const { data } = await axiosInstance.post(`reviews`, { content: content, rating: rating, book: book });
        const review = data.newReview
        dispatch(addTobookReviews(review))
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const deleteReview = createAsyncThunk("delete/review", async (id, { rejectWithValue, dispatch}) => {

    try {
        const { data } = await axiosInstance.delete(`reviews/${id}`);
        const review = data.result
      
        dispatch(removeFromBookReviews(review))

        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const allReview = createAsyncThunk("review", async (_, { rejectWithValue }) => {

    try {
        const { data } = await axiosInstance.get(`reviews`);

        return data
    } catch (error) {
        return rejectWithValue(error)
    }
})


