import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../util/util";
import axios from "axios";
import { redirect } from "react-router-dom";



const initialState = { user: {}, isLoading: false, token: null, resetPasswordMessage: null, loginConfirmed: null }

export const signin = createAsyncThunk("auth/signin", async (values) => {
    const response = await axios.post(`${baseUrl}/auth/signin`, values).catch(error => {
        return error.response
    });
    return response
});

export const forgetPassword = createAsyncThunk("auth/forgetPassword", async (values) => {

    // const navigate = useNavigate();
    const response = await axios.post(`${baseUrl}/auth/forgetPassword`, values).catch((error) => {
        console.log(error);
    });
    // console.log(response);
    // if (response.data.message === 'success') {
    //     console.log('done');
    //     redirect('/verifyPassword');
    // } else {
    //     console.log('not corr');

    // }
    return response.data.message;
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
            // console.log(actions.payload);
            // state.token = actions.payload.token
            // console.log(actions.payload.data.message);
            state.loginConfirmed = actions.payload;
            state.isLoading = false
        })
        builder.addCase(signin.rejected, (state, actions) => {
            // console.log(actions.error.message);
            // state.loginConfirmed = actions.payload;
            state.isLoading = false
            // state.token = actions.payload.token
        })

        builder.addCase(forgetPassword.pending, (state, actions) => {
            state.isLoading = true
        })
        builder.addCase(forgetPassword.fulfilled, (state, actions) => {
            // state.token = actions.payload.token
            state.resetPasswordMessage = actions.payload;
            state.isLoading = false
        })
        builder.addCase(forgetPassword.rejected, (state, actions) => {
            state.isLoading = false
            // state.token = actions.payload.token
        })
    }
})

export const authReducer = authSlice.reducer