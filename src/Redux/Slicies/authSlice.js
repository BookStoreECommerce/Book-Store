import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../util/util";
import axios from "axios";

const initialState = { user: {}, isLoading: false, token: null , error : null }

export const signin = createAsyncThunk("auth/signin", async (values) => {
    const response = await axios.post(`${baseUrl}/auth/signin`, values);
    return response
})

export const register = createAsyncThunk ("auth/signup", async (userData) => {
    try {
        let {data} = await axios.post(`${baseUrl}/auth/signup`, userData);
        return data
    } catch (error) {
        return error.response.data
    }

});

const authSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(signin.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(signin.fulfilled, (state, action) => {
            // state.token = action.payload.token
            state.isLoading = false
        })
        builder.addCase(signin.rejected, (state, action) => {
            state.isLoading = false
            // state.token = action.payload.token
        })
        builder.addCase(register.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(register.fulfilled, (state, action) => {
            if(action.payload.message === 'success'){
                state.token = action.payload.token.token
                localStorage.setItem('registerToken', state.token);
            }else{
                state.error = action.payload.error
            }
            state.isLoading = false
        })
        builder.addCase(register.rejected, (state, action) => {
            state.isLoading = false
        })
    }
})

export const authReducer = authSlice.reducer;