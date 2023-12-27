import { createSlice } from "@reduxjs/toolkit";
import { createFeedback } from "./feedbackActions.js";

const initialState = { loading: {}, success: false, error: null, errors: [] };

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createFeedback.pending, (state) => {
        state.loading["feedback/create"] = true;
        state.success = false;
        state.errors = [];
        state.error = null;
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
        if (payload.errors) {
          state.errors = payload.errors;
        } else if (payload.error) {
          state.error = payload.error;
        }
      });
  },
});

export const feedbackReducer = feedbackSlice.reducer;
