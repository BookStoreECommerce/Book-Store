import {
    createSlice
} from "@reduxjs/toolkit";
import { getAllCategories } from "./favActions";

const initialState = {
    favCategories: [],
    allCategories: [],
    allCategoriesName: [],
    isLoading: false,
    msgError: null,
    // token: null,
}

const favSlice = createSlice({
    name: "favourites",
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        //getAllCategories
        builder.addCase(getAllCategories.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getAllCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allCategories = action.payload.result;
            const categoriesNameArray = [];
            for (const result of state.allCategories) {
                categoriesNameArray.push(result.name);
                state.allCategoriesName = categoriesNameArray;
            }
        })
        builder.addCase(getAllCategories.rejected, (state, action) => {
            state.msgError = action.payload.error
            state.isLoading = false
        })
    }
})

export const favReducer = favSlice.reducer;