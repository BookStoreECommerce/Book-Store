import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios-instance";
import { addTobookReviews, removeFromBookReviews, updateReviews} from "./bookSlice";

//Add Review
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

//Delete Review
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

//Update Review
export const updateReview = createAsyncThunk("update/review", async ({id,content,rating},{rejectWithValue,dispatch}) => {

    try {
        const { data } = await axiosInstance.put(`reviews/${id}`,{ content: content, rating: rating });
        const review = data.review;
   
        dispatch(updateReviews(review))

        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

//All Review
export const allReview = createAsyncThunk("review", async (_, { rejectWithValue }) => {

    try {
        const { data } = await axiosInstance.get(`reviews`);

        return data
    } catch (error) {
        return rejectWithValue(error)
    }
})


