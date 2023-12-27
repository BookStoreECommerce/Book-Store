import { createSlice } from "@reduxjs/toolkit";
import { createFeedback } from "./feedbackActions.js";

const initialState = { loading: {}, success: false };

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createFeedback.pending, (state) => {
        state.loading["feedback/create"] = true;
      })
      .addCase(createFeedback.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.loading["feedback/create"] = false;
        state.success = true;
      })
      .addCase(createFeedback.rejected, (state, { payload }) => {
        console.log(payload);
        state.loading["feedback/create"] = false;
        state.success = false;
      });
  },
});

export const feedbackReducer = feedbackSlice.reducer;
