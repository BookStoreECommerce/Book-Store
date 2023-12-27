import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../axios/axios-instance.js";
import axios from "axios";

export const createFeedback = createAsyncThunk(
  "feedback/create",
  async ({ values, token }, { rejectWithValue }) => {
    
    return await axios
      .post("https://bookstore-api.codecraftsportfolio.online/api/v1/feedback", values, {
        headers: {
          authorization: token,
        },
      })
      .then(({ data }) => data)
      .catch(({ response }) => rejectWithValue(response.data));
  }
);
