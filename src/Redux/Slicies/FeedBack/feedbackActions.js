import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../axios/axios-instance.js";
import axios from "axios";
import { baseUrl } from "../../../util/util.js";

export const createFeedback = createAsyncThunk(
  "feedback/create",
  async ({ values, token }, { rejectWithValue }) => {
    return await axios
      .post(`${baseUrl}feedback`, values, {
        headers: {
          authorization: token,
        },
      })
      .then(({ data }) => data)
      .catch(({ response }) => rejectWithValue(response.data));
  }
);
