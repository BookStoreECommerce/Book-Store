import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../util/util";
import axios from "axios";

const initialState = { user: {}, isLoading: false, token: null , error : ''}

export const signin = createAsyncThunk("auth/signin", async (values) => {
    const response = await axios.post(`${baseUrl}/auth/signin`, values);
    return response
})

export const register = createAsyncThunk ("auth/signup", async (userData) => {
    console.log("here");
    let { data } = await axios.post( `${baseUrl}/auth/signup`,  userData);
    return data
});

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
        builder.addCase(register.pending, (state, actions) => {
            state.isLoading = true
        })
        builder.addCase(register.fulfilled, (state, actions) => {
            // state.token = actions.payload.token
            state.isLoading = false
        })
        builder.addCase(register.rejected, (state, actions) => {
            state.isLoading = false
            console.log(actions.payload);
            state.error = actions.payload
            // state.token = actions.payload.token
        })
    }
})

export const authReducer = authSlice.reducer