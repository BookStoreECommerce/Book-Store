import {
    createSlice
} from "@reduxjs/toolkit";
import { getAllReviews } from "./reviewAction";

const initialState = {
    allReviews: [],
    isLoading: false,
    msgError: null,

}

const reviewSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {
    },
    extraReducers: builder => {


        builder.addCase(getAllReviews.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getAllReviews.fulfilled, (state, action) => {
            state.allReviews = action.payload.result;
            state.isLoading = false;
        })
        builder.addCase(getAllReviews.rejected, (state, action) => {
            state.isLoading = false;
        })
    }
})

export const reviewReducer = reviewSlice.reducer;