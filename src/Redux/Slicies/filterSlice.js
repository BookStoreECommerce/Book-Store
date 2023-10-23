import { createSlice } from "@reduxjs/toolkit";
import { booksFilter } from "./filterActions";

const initialState = {
    filter: [],
    isLoading: false,
    msgError: null,
}

const booksFilterSlice = createSlice({
    name: "booksFilter",
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        //booksFilter
        builder.addCase(booksFilter.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(booksFilter.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log(action.payload.result);
        })
        builder.addCase(booksFilter.rejected, (state, action) => {
            state.msgError = action.payload.error
            state.isLoading = false
        })
    }
})

export const booksFilterReducer = booksFilterSlice.reducer;