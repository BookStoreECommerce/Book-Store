import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios-instance";

export const getOrders = createAsyncThunk(`orders`, async (token, { rejectWithValue }) => {
    console.log("Ttoken",token);
    try {
        const { data } = await axiosInstance.get('order',token);
        console.log(data);
        return data
    } catch (error) {
        return rejectWithValue(error)
    }
  }
);