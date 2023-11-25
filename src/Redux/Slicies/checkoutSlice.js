import { createSlice } from "@reduxjs/toolkit";
import { addCoupon, removeCoupon } from "./checkoutAction";

const initialState = {
  isLoading: false,
  msgError: null,
};


const checkoutSlice = createSlice({
  name: "books",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addCoupon.pending, (state, action) => {
      state.isLoading = true;
      state.msgError = "";
    });
    builder.addCase(addCoupon.fulfilled, (state, action) => {
      state.coupon_code = action.payload.cart.coupon_code;
      state.discount = action.payload.cart.discount;
      state.totalAmount = action.payload.cart.totalAmount;
      state.totalAmountAfterDisc = action.payload.cart.totalAmountAfterDisc;
      state.isLoading = false;
    });
    builder.addCase(addCoupon.rejected, (state, action) => {
      state.isLoading = false
      state.msgError = action.payload.error
    });
    builder.addCase(removeCoupon.pending, (state, action) => {
      state.isLoading = true;
      state.msgError = "";
    });
    builder.addCase(removeCoupon.fulfilled, (state, action) => {
      state.coupon_code = "";
      state.discount = 0;
      state.totalAmountAfterDisc = action.payload.cart.totalAmount;
      state.isLoading = false;
    });
    builder.addCase(removeCoupon.rejected, (state, action) => {
      state.isLoading = false
      state.msgError = action.payload.error
    });
  },
});

export const checkoutReducer = checkoutSlice.reducer;
export const {
  clearLocalStorageCArt,
  setCartInLocalStorage,
  getCartWithoutToken,
  addToCart,
  increaseCartQty,
  decreaseCartQty,
  deletFromCart,
  addBookForBuy,
  calcPrice,
} = checkoutSlice.actions;
// export const getCart = checkoutSlice.actions.getCart;
