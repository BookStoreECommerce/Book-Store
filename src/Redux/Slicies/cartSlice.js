import { createSlice } from "@reduxjs/toolkit";
import { getCart, addCart } from './cartAction';
const initialState = {
    cartBooks: [],
    discount: 0,
    totalAmount: 0,
    totalAmountAfterDisc: 0,
    isLoading: false,
    msgError: null,
    token: null,
    totalQty: 0,
    user: null,
    totalCartBooks: 0
};


const cartSlice = createSlice({
    name: 'cartBooks',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // get cart
        builder.addCase(getCart.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getCart.fulfilled, (state, action) => {
            state.isLoading = false;
            if (action.payload.cart.books) {
                state.cartBooks = action.payload.cart.books;
            }
            state.msgError = action.payload.message;
        })
        builder.addCase(getCart.rejected, (state, action) => {
            state.isLoading = false
            state.msgError = action.payload.error
        })

        // add cart
        builder.addCase(addCart.pending, (state, action) => {
            state.isLoading = true;
        })

        builder.addCase(addCart.fulfilled, (state, action) => {

            state.cartBooks = action.payload.cart.books;
            console.log(state.cartBooks);
            state.discount = action.payload.cart.discount;
            state.totalAmount = action.payload.cart.totalAmount;
            state.totalAmountAfterDisc = action.payload.cart.totalAmountAfterDisc;
            state.isLoading = false;
        })

        builder.addCase(addCart.rejected, (state, action) => {
            state.isLoading = false
            state.msgError = action.payload.error
        })
    }
})

export const cartReducer = cartSlice.reducer;

// export const getCart = cartSlice.actions.getCart;