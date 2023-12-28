import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios-instance";
import { clearLocalStorageCArt, updateFromCheckout } from "./cartSlice";

export const addCoupon = createAsyncThunk(
  "cart/addCoupon",
  async (code, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axiosInstance.patch("cart/coupon", { code });
      dispatch(
        updateFromCheckout({
          coupon_code: data.cart.coupon_code,
          discount: data.cart.discount,
          totalAmountAfterDisc: data.cart.totalAmountAfterDisc,
        })
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const removeCoupon = createAsyncThunk(
  "cart/removeCoupon",
  async (code, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axiosInstance.delete(`cart/coupon/${code}`);
      dispatch(
        updateFromCheckout({
          coupon_code: "",
          discount: "",
          totalAmountAfterDisc: data.cart.totalAmountAfterDisc,
        })
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addOrder = createAsyncThunk(
  "checkout/addOrder",
  async (orderDetails, { rejectWithValue, dispatch }) => {
    console.log(orderDetails);
    try {
      const { data } = await axiosInstance.post("order", { ...orderDetails });
      if (data.session) {
        window.location.href = data.session.url;
      } else if (data.url) {
        localStorage.removeItem("cartDetails");
        dispatch(clearLocalStorageCArt("cartDetails"));
        window.location.href = data.url;
        // <Navigate to={data.url}/>;
      }
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
