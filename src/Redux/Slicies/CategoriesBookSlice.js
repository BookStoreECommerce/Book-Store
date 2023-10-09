import { createSlice } from "@reduxjs/toolkit";
import {getCatBooks} from './CategoriesBookActions.js';
import {getCatBooksBySlug} from './CategoriesBookActions.js';

const initialState = {
   categoriesBooks :[],
   catBySlug:[],
    isLoading: false
}

const CategoriesBookSlice = createSlice({
    name:'books',
    initialState:initialState,
    extraReducers:(builder)=>{
     builder.addCase(getCatBooks.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getCatBooks.fulfilled, (state,action)=>{
            state.categoriesBooks = action.payload;
        })
        builder.addCase(getCatBooks.rejected, (state, action) => {
            state.msgError = action.payload.error
            state.isLoading = false
        })
    
    }
})

const CategoriesBookBySlug = createSlice({
    name:'bookCat',
    initialState:initialState,
    extraReducers:(builder)=>{
        builder.addCase(getCatBooksBySlug.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getCatBooksBySlug.fulfilled, (state,action)=>{
            state.catBySlug = action.payload;
            state.isLoading = false
        })
        builder.addCase(getCatBooksBySlug.rejected, (state, action) => {
            state.msgError = action.payload.error
            state.isLoading = false
        })

    }
})
export const categoriesBooksReducer = CategoriesBookSlice.reducer;
export const categoriesBooksSlugReducer = CategoriesBookBySlug.reducer;