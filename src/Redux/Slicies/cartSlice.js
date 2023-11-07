import { createSlice } from "@reduxjs/toolkit";
import { getCart, addCartWithToken, updateCart, clearCart, deleteCartItem, addCoupon, removeCoupon } from './cartAction';
const initialState = {
    books: [],
    localStorageCart: [],
    discount: 0,
    totalAmount: 0,
    totalAmountAfterDisc: 0,
    isLoading: false,
    msgError: null,
    totalQty: 0,
    coupon_code: "",
    totalbooks: 0,
    loading: {}
};



function getCartFromLocalStorage() {
    if (localStorage.getItem("cartDetails")) {
        return JSON.parse(localStorage.getItem("cartDetails"))
    }
}
function setCartFromLocalStorage(cart) {
    localStorage.setItem("cartDetails", JSON.stringify(cart))
}

function calcBookPrice(price, qty) {
    return price * qty
}

const cartSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        getCartWithoutToken: (state) => {
            state.isLoading = false;
            state.localStorageCart = getCartFromLocalStorage()
        },
        setCartInLocalStorage: (state, action) => {
            if (action.payload) {
                console.log(action.payload);
                // state.localStorageCart = action.payload;
            }
            // localStorage.setItem('cartDetails', JSON.stringify(state.localStorageCart))
            state.msgError = action.payload.message;
        },
        clearLocalStorageCArt: (state, action) => {
            if (action.payload) {
                localStorage.removeItem(action.payload);
                state.localStorageCart = [];
            }
            state.isLoading = false;
            state.msgError = action.payload.error
        },
        addToCart: (state, { payload }) => {
            console.log(payload);
            const i = state.localStorageCart?.books?.findIndex(el => el.book._id === payload._id)
            console.log(i);
            if (i === undefined) {
                state.localStorageCart = {
                    books: [{
                        book: {
                            image: payload.image.secure_url,
                            _id: payload._id,
                            price: payload.price,
                            name: payload.name
                        },
                        price: payload.price,
                        qty: 1,
                        totalPrice: payload.price,
                        coupon_code: ""
                    }]
                }
            } else if (i === -1) {
                state.localStorageCart.books.push({
                    book: {
                        image: payload.image.secure_url,
                        _id: payload._id,
                        price: payload.price,
                        name: payload.name
                    },
                    price: payload.price,
                    qty: 1,
                    totalPrice: payload.price,
                    coupon_code: ""
                })
            } else {
                state.localStorageCart.books[i].qty++
                state.localStorageCart.books[i].coupon_code = "3agoooooz"
                const { price, qty } = state.localStorageCart.books[i]
                state.localStorageCart.books[i].totalPrice = calcBookPrice(price, qty)
                console.log(i);
                // setCartFromLocalStorage(state.localStorageCart)

            }


            setCartFromLocalStorage(state.localStorageCart)
        },
        increaseCartQty: (state, { payload }) => {
            console.log(payload);
            const i = state.localStorageCart.books.findIndex(el => el.book._id === payload)
            state.localStorageCart.books[i].qty++
            state.localStorageCart.books[i].coupon_code = "agooooz"
            const { price, qty } = state.localStorageCart.books[i]
            state.localStorageCart.books[i].totalPrice = calcBookPrice(price, qty)
            setCartFromLocalStorage(state.localStorageCart)
        },
        decreaseCartQty: (state, { payload }) => {
            const i = state.localStorageCart.books.findIndex(el => el.book._id === payload)
            state.localStorageCart.books[i].qty--
            state.localStorageCart.books[i].coupon_code = "agooooz"
            const { price, qty } = state.localStorageCart.books[i]
            state.localStorageCart.books[i].totalPrice = calcBookPrice(price, qty)
            setCartFromLocalStorage(state.localStorageCart)
        },

        deletFromCart: (state, { payload }) => {
            console.log(payload);
            state.localStorageCart.books = state.localStorageCart?.books?.filter(el => el.book._id !== payload)
            setCartFromLocalStorage(state.localStorageCart)
            if (state.localStorageCart.books.length === 0) {
                localStorage.removeItem('cartDetails')
            }



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
        builder.addCase(addCoupon.pending, (state, action) => {
            // state.isLoading = true;
            // state.loading["cart/patchData"] = true
        })
        builder.addCase(addCoupon.fulfilled, (state, action) => {
            console.log(action);
            state.coupon_code = action.payload.cart.coupon_code;
            state.discount = action.payload.cart.discount;
            state.totalAmount = action.payload.cart.totalAmount;
            state.totalAmountAfterDisc = action.payload.cart.totalAmountAfterDisc;
            // state.isLoading = false;
            // state.msgError = action.payload.error
        })
        builder.addCase(addCoupon.rejected, (state, action) => {
            console.log(action);
            // state.isLoading = false
            // state.msgError = action.payload.error
        })
        builder.addCase(removeCoupon.pending, (state, action) => {
            // state.isLoading = true;
            // state.loading["cart/patchData"] = true
        })
        builder.addCase(removeCoupon.fulfilled, (state, action) => {
            console.log(action);
            state.coupon_code = action.payload.cart.coupon_code;
            state.discount = action.payload.cart.discount;
            state.totalAmount = action.payload.cart.totalAmount;
            state.totalAmountAfterDisc = action.payload.cart.totalAmountAfterDisc;
            // state.isLoading = false;
            // state.msgError = action.payload.error
        })
        builder.addCase(removeCoupon.rejected, (state, action) => {
            console.log(action);
            // state.isLoading = false
            // state.msgError = action.payload.error
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
export const { clearLocalStorageCArt, setCartInLocalStorage, getCartWithoutToken, addToCart, increaseCartQty, decreaseCartQty, deletFromCart } = cartSlice.actions;
// export const getCart = cartSlice.actions.getCart;