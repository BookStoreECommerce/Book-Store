import { createSlice } from "@reduxjs/toolkit";
import { addCoupon, addOrder, removeCoupon } from "./checkoutActions";

const initialState = {
  isCouponLoading: false,
  couponErrorMsg: null,
  isLoading: false,
  msgError: ''
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addCoupon.pending, (state, action) => {
        state.isCouponLoading = true;
        state.couponErrorMsg = "";
      })
      .addCase(addCoupon.fulfilled, (state, action) => {
        state.isCouponLoading = false;
      })
      .addCase(addCoupon.rejected, (state, action) => {
        state.isCouponLoading = false;
        state.couponErrorMsg = action.payload.error;
      });


    builder
      .addCase(removeCoupon.pending, (state, action) => {
        state.isCouponLoading = true;
        state.couponErrorMsg = "";
      })
      .addCase(removeCoupon.fulfilled, (state, action) => {
        state.isCouponLoading = false;
      })
      .addCase(removeCoupon.rejected, (state, action) => {
        state.isCouponLoading = false;
        state.couponErrorMsg = action.payload.error;
      });

    builder
      .addCase(addOrder.pending, (state, action) => {
        state.isLoading = true;
        state.msgError = "";
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.msgError = action.payload.error;
      });
  },
});

export const checkoutReducer = checkoutSlice.reducer;
