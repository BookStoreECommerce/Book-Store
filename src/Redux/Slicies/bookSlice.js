import {
    createSlice
} from "@reduxjs/toolkit";
import { getAllBooks, getBooksByWord } from "./bookActions";

const initialState = {
    user: null,
    isLoading: false,
    token: null,
    msgError: null
}

const authSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        clearError: (state) => {
            state.msgError = null;
        },
        setUser: (state, action) => {
            const user = action.payload;
            state.user = user;
        },
        logout: (state, action) => {
            localStorage.removeItem('access-token');
        }
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


    }
})

export const authReducer = authSlice.reducer;
export const { clearError, setUser, logout } = authSlice.actions;
