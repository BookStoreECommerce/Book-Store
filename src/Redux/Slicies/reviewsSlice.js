import {
    createSlice
} from "@reduxjs/toolkit";
import { addReview } from "./reviewAction";

const initialState = {
    isLoading: false,
    msgError: null,
}

const reviewSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        // addReview
        builder.addCase(addReview.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(addReview.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(addReview.rejected, (state, action) => {
            state.isLoading = false;
        })
    }
})

export const reviewReducer = reviewSlice.reducer;