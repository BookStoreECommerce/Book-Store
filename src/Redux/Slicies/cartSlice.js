import { createSlice } from "@reduxjs/toolkit";
import { getCart, addCartWithToken, updateCart, clearCart, deleteCartItem, addCartWithOutToken } from './cartAction';
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
    totalCartBooks: 0,
    loading: {}
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

        // add cart with token
        builder.addCase(addCartWithToken.pending, (state, action) => {
            // state.isLoading = true;
        })

        builder.addCase(addCartWithToken.fulfilled, (state, action) => {
            if (action.payload.cart) {
                console.log(action.payload.cart.books);
                state.cartBooks = action.payload.cart.books;
                state.discount = action.payload.cart.discount;
                state.totalAmount = action.payload.cart.totalAmount;
                state.totalAmountAfterDisc = action.payload.cart.totalAmountAfterDisc;
            }
            state.isLoading = false;
            state.msgError = action.payload.error
        })
        builder.addCase(addCartWithToken.rejected, (state, action) => {
            state.isLoading = false
            // state.msgError = action.payload.error
        })


        // add cart without token
        builder.addCase(addCartWithOutToken.pending, (state, action) => {
            // state.isLoading = true;
        })

        builder.addCase(addCartWithOutToken.fulfilled, (state, action) => {
            // console.log(action);
            // state.cartBooks = action.payload.cart.books;
            // state.discount = action.payload.cart.discount;
            // state.totalAmount = action.payload.cart.totalAmount;
            // state.totalAmountAfterDisc = action.payload.cart.totalAmountAfterDisc;

            // state.isLoading = false;
            // state.msgError = action.payload.error
        })
        builder.addCase(addCartWithOutToken.rejected, (state, action) => {
            state.isLoading = false
            // state.msgError = action.payload.error
        })

        // update Cart
        builder.addCase(updateCart.pending, (state, action) => {
            // state.isLoading = true;
            state.loading["cart/patchData"] = true
        })
        builder.addCase(updateCart.fulfilled, (state, action) => {
            state.cartBooks = action.payload.cart.books;
            state.discount = action.payload.cart.discount;
            state.totalAmount = action.payload.cart.totalAmount;
            state.totalAmountAfterDisc = action.payload.cart.totalAmountAfterDisc;
            state.isLoading = false;
            state.msgError = action.payload.error
        })
        builder.addCase(updateCart.rejected, (state, action) => {
            state.isLoading = false
            state.msgError = action.payload.error
        })


        // delete CartItem
        builder.addCase(deleteCartItem.pending, (state, action) => {
            // state.isLoading = true;
        })

        builder.addCase(deleteCartItem.fulfilled, (state, action) => {
            state.cartBooks = action.payload.cart.books;
            state.discount = action.payload.cart.discount;
            state.totalAmount = action.payload.cart.totalAmount;
            state.totalAmountAfterDisc = action.payload.cart.totalAmountAfterDisc;
            state.isLoading = false;
            state.msgError = action.payload.error
        })

        builder.addCase(deleteCartItem.rejected, (state, action) => {
            state.isLoading = false
            // state.msgError = action.payload.error
        })


        // delete Cart
        builder.addCase(clearCart.pending, (state, action) => {
            // state.isLoading = true;
        })

        builder.addCase(clearCart.fulfilled, (state, action) => {
            state.cartBooks = action.payload.cart.books;
            state.discount = action.payload.cart.discount;
            state.totalAmount = action.payload.cart.totalAmount;
            state.totalAmountAfterDisc = action.payload.cart.totalAmountAfterDisc;
            state.isLoading = false;
            state.msgError = action.payload.error
        })

        builder.addCase(clearCart.rejected, (state, action) => {
            state.isLoading = false
            // state.msgError = action.payload.error
        })
    }
})

export const cartReducer = cartSlice.reducer;

// export const getCart = cartSlice.actions.getCart;