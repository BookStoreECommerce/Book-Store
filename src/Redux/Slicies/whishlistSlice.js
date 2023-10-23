import { createSlice } from "@reduxjs/toolkit";
import {getWhisListBooks, getWhishList, getWhishListBooks} from './whishlistActions.js';


const initialState = {
   whishlist :JSON.parse(localStorage.getItem('whishList')) || [],
   whishListBooks:[],
   isLoading: false,
   msgError: null,

}

const WhisListSlice = createSlice({
    name:'whishlist',
    initialState:initialState,
    extraReducers:(builder)=>{
        // getWhishList
        builder.addCase(getWhishList.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getWhishList.fulfilled, (state,action)=>{
            state.isLoading = false
            state.whishlist = action.payload.wish_List
                })
        builder.addCase(getWhishList.rejected, (state, action) => {
            state.isLoading = false
               state.msgError = action.payload.error
        })


        builder.addCase(getWhishListBooks.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getWhishListBooks.fulfilled, (state,action)=>{
            state.isLoading = false
            state.whishListBooks = action.payload.result
                })
        builder.addCase(getWhishListBooks.rejected, (state, action) => {
            state.isLoading = false
               state.msgError = action.payload.error
        })
        
    
    }
})

export const whishListReducer = WhisListSlice.reducer;


