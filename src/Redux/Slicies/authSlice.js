import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../util/util";
import axios from "axios";

const initialState = {
  user: {},
  isLoading: false,
  token: null,
  error: null,
  resetPasswordMessage: null,
  loginConfirmed: null,
};

export const signin = createAsyncThunk("auth/signin", async (values) => {
  const response = await axios
    .post(`${baseUrl}/auth/signin`, values)
    .catch((error) => {
      return error.response;
    });
  return response;
});

export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (values) => {
    const response = await axios
      .post(`${baseUrl}/auth/forgetPassword`, values)
      .catch((error) => {
        return error.response;
      });
    return response;
  }
);

export const register = createAsyncThunk("auth/signup", async (userData) => {
  try {
    let { data } = await axios.post(`${baseUrl}/auth/signup`, userData);
    return data;
  } catch (error) {
    return error.response.data;
  }
});

const saveUserData = (token, refreshToken) => {
  localStorage.setItem("BookStoreToken", token);
  localStorage.setItem("BookStoreRefreshToken", refreshToken);
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    resetError: (state, action) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signin.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      // state.token = action.payload.token
      if (action.payload.data.message === "success") {
        saveUserData(
          action.payload.data.token,
          action.payload.data.refreshToken
        );

        state.error = null;
      } else {
        state.error = action.payload.data.error;
      }
      state.isLoading = false;
    });
    builder.addCase(signin.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(register.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      if (action.payload.message === "success") {
        state.token = action.payload.token.token;
        saveUserData(
          action.payload.token.token,
          action.payload.token.refreshToken
        );
      } else {
        state.error = action.payload.error;
      }
      state.isLoading = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(forgetPassword.pending, (state, action) => {
        state.error = null
      state.isLoading = true;
    });
    builder.addCase(forgetPassword.fulfilled, (state, action) => {
      if (action.payload.data.message === "success") {
        saveUserData(
          action.payload.data.token,
          action.payload.data.refreshToken
        );
            state.error = null;
        } else {
          console.log(action.payload.data.error);
        state.error = action.payload.data.error;
      }
      state.resetPasswordMessage = action.payload;
      state.isLoading = false;
    });
    builder.addCase(forgetPassword.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
    });
  },
});

export const authReducer = authSlice.reducer;

export const { resetError } = authSlice.actions;
