import {
    createSlice
} from "@reduxjs/toolkit";
import { addReview} from "./reviewAction";

const initialState = {
    loading: false,
    msgError: null,
    addReviews:{},
  

}

const reviewSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        // addReview
        builder.addCase(addReview.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(addReview.fulfilled, (state, action) => {
            state.loading = false;
            state.addReviews =  action.payload.result;
            console.log(state.addReviews);
        })
        builder.addCase(addReview.rejected, (state, action) => {
            state.loading = false;
        })
    
   
    }
})

export const reviewReducer = reviewSlice.reducer;