import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../util/util";
import axios from "axios";

const initialState = { user: {}, isLoading: false, token: null }

export const signin = createAsyncThunk("auth/signin", async (values) => {
    const response = await axios.post(`${baseUrl}/auth/signin`, values);
    return response
})





const authSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(signin.pending, (state, actions) => {
            state.isLoading = true
        })
        builder.addCase(signin.fulfilled, (state, actions) => {
            // state.token = actions.payload.token
            state.isLoading = false
        })
        builder.addCase(signin.rejected, (state, actions) => {
            state.isLoading = false
            // state.token = actions.payload.token
        })
    }
})

export const authReducer = authSlice.reducer