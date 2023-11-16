import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios-instance";
import { addTobookReviews } from "./bookSlice";

export const addReview = createAsyncThunk("book/review", async ({content,rating,book}, { rejectWithValue, dispatch }) => {

    try {
        const { data } = await axiosInstance.post(`reviews`, { content: content, rating: rating, book: book });
        const review = data.result
        dispatch(addTobookReviews(review))
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

