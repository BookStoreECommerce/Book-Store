import {
    createSlice
} from "@reduxjs/toolkit";
import { getAllBooks, getBooksByWord, getNewBooks } from "./bookActions";

const initialState = {
    isLoading: false,
    msgError: null,
    newBooksArray: [],
}

const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        clearError: (state) => {
            state.msgError = null;
        },
    },
    extraReducers: builder => {

        // getAllBooks
        builder.addCase(getAllBooks.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getAllBooks.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log(action);
        })
        builder.addCase(getAllBooks.rejected, (state, action) => {
            state.isLoading = false
            state.msgError = action.payload.error
            if (action.error) {
                state.msgError = action.error
            } else {
                state.msgError = action.errors[0].message
            }
            console.log(action.payload.error);
            if (action.payload.error) {
                state.msgError = action.payload.error
            } else {
                state.msgError = action.payload.errors[0].message
            }
        })

        // getBooksByWord
        builder.addCase(getBooksByWord.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getBooksByWord.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log(action);
        })
        builder.addCase(getBooksByWord.rejected, (state, action) => {
            state.isLoading = false
            state.msgError = action.payload.error
            if (action.error) {
                state.msgError = action.error
            } else {
                state.msgError = action.errors[0].message
            }
            console.log(action.payload.error);
            if (action.payload.error) {
                state.msgError = action.payload.error
            } else {
                state.msgError = action.payload.errors[0].message
            }
        })

        
        // getNewBooks
        builder.addCase(getNewBooks.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getNewBooks.fulfilled, (state, action) => {
            state.isLoading = false;
            state.newBooksArray = action.payload.result;
        })
        builder.addCase(getNewBooks.rejected, (state, action) => {
            state.isLoading = false
            if (action.payload.error) {
                state.msgError = action.payload.error
            } else {
                state.msgError = action.payload.errors[0].message
            }
        })

    }
})

export const booksReducer = booksSlice.reducer;
export const { clearError } = booksSlice.actions;
