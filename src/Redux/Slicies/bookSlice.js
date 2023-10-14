import { createSlice } from "@reduxjs/toolkit";
import { getAllBooks, getBooksByWord } from "./bookActions";

const initialState = {
    isLoading: false,
    msgError: null,
    books: [],
    totalCount: 0
}

const bookSlice = createSlice({
    name: "allBooks",
    initialState,
    extraReducers: builder => {

        // getAllBooks
        builder.addCase(getAllBooks.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getAllBooks.fulfilled, (state, action) => {
            state.isLoading = false;
            state.books = action.payload.result;
            state.totalCount = action.payload.totalCount
        })
        builder.addCase(getAllBooks.rejected, (state, action) => {
            state.isLoading = false

        })


        // getBooksByWord
        builder.addCase(getBooksByWord.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getBooksByWord.fulfilled, (state, action) => {
            state.isLoading = false;
            state.books = action.payload.result;
            state.totalCount = action.payload.totalCount
        })
        builder.addCase(getBooksByWord.rejected, (state, action) => {
            state.isLoading = false
        })


    }
})

export const bookReducer = bookSlice.reducer;
export const { clearError, setUser, logout } = bookSlice.actions;
