import { createSlice } from "@reduxjs/toolkit";
import { getCart, addCartWithToken, updateCart, clearCart, deleteCartItem } from './cartAction';
const initialState = {
    books: [],
    localStorageCart: [],
    discount: 0,
    totalAmount: 0,
    totalAmountAfterDisc: 0,
    isLoading: false,
    msgError: null,
    totalQty: 0,
    totalbooks: 0,
    loading: {}
};

const cartSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        getCartWithoutToken: (state, action) => {
            state.isLoading = false;
            if (action.payload) {
                state.localStorageCart = action.payload;
            }
        },
        setCartInLocalStorage: (state, action) => {
            if (action.payload) {
                state.localStorageCart = action.payload;
            }
            localStorage.setItem('cartDetails', JSON.stringify(state.localStorageCart))
            state.msgError = action.payload.message;
        },
        clearLocalStorageCArt: (state, action) => {
            if (action.payload) {
                localStorage.removeItem(action.payload)
            }
            state.isLoading = false;
            state.msgError = action.payload.error
        },
    },
    extraReducers: (builder) => {

        // get cart with token
        builder.addCase(getCart.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getCart.fulfilled, (state, action) => {
            state.isLoading = false;

            if (action.payload.cart.books) {
                state.books = action.payload.cart.books;
            }
            state.discount = action.payload.cart.discount;
            state.totalAmount = action.payload.cart.totalAmount;
            state.totalAmountAfterDisc = action.payload.cart.totalAmountAfterDisc;
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
                state.books = action.payload.cart.books;
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

        // update Cart with token
        builder.addCase(updateCart.pending, (state, action) => {
            // state.isLoading = true;
            state.loading["cart/patchData"] = true
        })
        builder.addCase(updateCart.fulfilled, (state, action) => {
            state.books = action.payload.cart.books;
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


        // delete CartItem with token
        builder.addCase(deleteCartItem.pending, (state, action) => {
            // state.isLoading = true;
        })
        builder.addCase(deleteCartItem.fulfilled, (state, action) => {
            state.books = action.payload.cart.books;
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


        // clear Cart with token
        builder.addCase(clearCart.pending, (state, action) => {
            // state.isLoading = true;
        })
        builder.addCase(clearCart.fulfilled, (state, action) => {
            state.books = action.payload.cart.books;
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
export const { clearLocalStorageCArt ,setCartInLocalStorage,getCartWithoutToken} = cartSlice.actions;
// export const getCart = cartSlice.actions.getCart;