import { createSlice } from "@reduxjs/toolkit";
import { getCart } from './cartAction';
const initialState = {
    cartBooks: [],
    isLoading: false,
    msgError: null
};


const cartSlice = createSlice({
    name: 'cartBooks',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getCart.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getCart.fulfilled, (state, action) => {
            state.categories = action.payload;
            state.isLoading = false;
          
            state.msgError = action.payload.message;
        })
    }
})

export const cartReducer = cartSlice.reducer;

// export const getCart = cartSlice.actions.getCart;