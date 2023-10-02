import {
    createSlice
} from "@reduxjs/toolkit";
import { getAllCategories, setFavCategories } from "./favActions";

const initialState = {
    // favCategories: [],
    getCategoriesResult: [],
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
            state.getCategoriesResult = action.payload.result;
            const categoriesArray = [];
            const categoriesNameArray = [];
            for (const result of state.getCategoriesResult) {
                let categoryObj = {};
                categoryObj.id = result._id;
                categoryObj.name = result.name;
                categoriesArray.push(categoryObj);
                categoriesNameArray.push(result.name);
                state.allCategories = categoriesArray;
                state.allCategoriesName = categoriesNameArray;
            }
        })
        builder.addCase(getAllCategories.rejected, (state, action) => {
            state.msgError = action.payload.error
            state.isLoading = false
        })
        //setFavCategories
        builder.addCase(setFavCategories.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(setFavCategories.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(setFavCategories.rejected, (state, action) => {
            state.msgError = action.payload.error
            state.isLoading = false;
        })
    }
})

export const favReducer = favSlice.reducer;