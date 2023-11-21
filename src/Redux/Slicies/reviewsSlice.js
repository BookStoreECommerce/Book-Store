import {
    createSlice
} from "@reduxjs/toolkit";
import { addReview, allReview, deleteReview} from "./reviewAction";

const initialState = {
    loading: false,
    msgError: null,
    addReviews:{},
    deleteReviews:[],
    allReviews:[]
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
            state.addReviews =  action.payload.newReview;
            console.log(state.addReviews);
        })
        builder.addCase(addReview.rejected, (state, action) => {
            state.loading = false;
        })

        //deleteReview
        builder.addCase(deleteReview.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(deleteReview.fulfilled, (state, action) => {
            state.loading = false;
            state.deleteReviews =  action.payload.result;
            console.log(state.deleteReviews);
        
        })
        builder.addCase(deleteReview.rejected, (state, action) => {
            state.loading = false;
        })

         // allReview
         builder.addCase(allReview.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(allReview.fulfilled, (state, action) => {
            state.loading = false;
            state.allReviews =  action.payload;
            console.log(state.addReviews);
        })
        builder.addCase(allReview.rejected, (state, action) => {
            state.loading = false;
        })
   
    }
})

export const reviewReducer = reviewSlice.reducer;