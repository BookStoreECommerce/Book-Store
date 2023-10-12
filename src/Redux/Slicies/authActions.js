import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios-instance";

export const signin = createAsyncThunk("/signin", async (values, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.post('auth/signin', values);
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const register = createAsyncThunk("auth/signup", async (userData, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.post('auth/signup', userData);
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});


export const registerVerification = createAsyncThunk("auth/verifyEmail", async (verifycode, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.post(`auth/verifyEmail`, { code: verifycode });
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const resendCode = createAsyncThunk("auth/resendCode", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.post(`auth/resendCode`, null);
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const userProfile = createAsyncThunk("users/update", async (userData, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.put(`users/update`, userData);
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

export const getUserProfile = createAsyncThunk("users/profile", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get(`users/profile`);
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const forgetPassword = createAsyncThunk(
    "auth/forgetPassword",
    async (values, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('auth/forgetPassword', values)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);


export const varifyPasswordEmail = createAsyncThunk("auth/varifyPasswordEmail", async (values, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.post('auth/varifyPasswordEmail', values, { headers: { 'authorization': localStorage.getItem('access-token') } })
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});


export const resetPassword = createAsyncThunk("auth/resetPassword", async (values, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance
            .post('auth/resetPassword', values, { headers: { 'authorization': localStorage.getItem('access-token') } })
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});


export const signinWithToken = createAsyncThunk("auth/signin-with-token", async (token, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.post(`auth/signin/${token}`);
        return data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data)
    }
})

export const signout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.post('auth/logout');
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})



