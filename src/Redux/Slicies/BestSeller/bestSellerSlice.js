import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../axios/axios-instance.js";
import { dark } from "@mui/material/styles/createPalette";

const initialState = { bestSeller: [] };

export const getBestSellerData = createAsyncThunk(
  "get/bestSeller",
  async (_, { rejectWithValue }) => {
    return axiosInstance("book?sort=-sold&page=1")
      .then(({ data }) => data.result)
      .catch(({ response }) => rejectWithValue(response));
  }
);

const bestSlice = createSlice({
  name: "bestSeller",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBestSellerData.pending, (state, { payload }) => {})
      .addCase(getBestSellerData.fulfilled, (state, { payload }) => {
        state.bestSeller = payload;
      });
  },
});

export const bestReducer = bestSlice.reducer;
