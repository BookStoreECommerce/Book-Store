import { createSlice } from "@reduxjs/toolkit";
import { getAllBooks, getBookBySlug, getBooksByWord, getNewBooks } from "./bookActions";

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

        // get Book By Slug
      builder.addCase(getBookBySlug.pending, (state, actions) => {
        state.isLoading = true;
      })
      .addCase(getBookBySlug.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.specBook = payload.result
        state.bookCategory = payload.bookCategory.length < 7 ? payload.books : payload.bookCategory;
      })
      .addCase(getBookBySlug.rejected, (state, {payload}) => {
        state.isLoading = false;
        state.msgError = payload.error
        state.specBook = null
      });

      //newBooksArray
    builder.addCase(getNewBooks.pending, (state, {payload}) => {
        state.isLoading = true
      })
      .addCase(getNewBooks.fulfilled, (state, {payload})=>{
        state.isLoading = true
        state.newBooksArray = payload
      })
      .addCase(getNewBooks.rejected, (state, {payload})=>{
        state.isLoading = true
      })


    }
})

export const booksReducer = bookSlice.reducer;
export const { clearError, setUser, logout } = bookSlice.actions;
