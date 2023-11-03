import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from './CategoriesAction';
const initialState = {
    categories: [],
    isLoading: false,
    msgError: null
};


const catSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
            state.isLoading = false;
          
            state.msgError = action.payload.message;
        })
    }
})

export const catReducer = catSlice.reducer;

// export const getCategories = catSlice.actions.getCategories;