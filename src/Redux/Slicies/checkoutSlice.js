import { createSlice } from "@reduxjs/toolkit";
import { addCoupon, removeCoupon } from "./checkoutActions";

const initialState = {
  isCouponLoading: false,
  couponErrorMsg: null,
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
  },
});

export const checkoutReducer = checkoutSlice.reducer;
