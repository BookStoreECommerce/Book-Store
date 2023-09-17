import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios-instance";

const initialState = { user: {}, isLoading: false, token: null , msgError : null }

export const signin = createAsyncThunk("auth/signin", async (values) => {
    const response = await axiosInstance.post('auth/signin', values);
    return response
})

export const register = createAsyncThunk ("auth/signup", async (userData) => {
    try {
        let {data} = await axiosInstance.post('auth/signup', userData);
        return data
    } catch (error) {
        return error.response.data
    }
});


export const registerVerification = createAsyncThunk ("auth/verifyEmail", async (verifycode) => {
    try {
        let {data} = await axiosInstance.post(`auth/verifyEmail`, {code:verifycode}, 
        {headers: 
            {authorization: localStorage.getItem("BookStoreToken")}
        });
        return data
    } catch (error) {
        return error.response.data
    }
});


export const signinWithToken = createAsyncThunk("auth/signin-with-token", async(toekn) => {
    try{
        let {data} = await axiosInstance.post(`auth/signin/${toekn}`);
        return data
    }catch(error){
        return error.response.data
    }
})

const saveUserData = (token , refreshToken) => {
    localStorage.setItem("BookStoreToken", token)
    localStorage.setItem("BookStoreRefreshToken", refreshToken)
}


const authSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        clearError: (state) => {
            state.msgError = null;
        }
    },
    extraReducers: builder => {
        //login
        builder.addCase(signin.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(signin.fulfilled, (state, action) => {
            // state.token = action.payload.token
            if(action.payload.message === "success"){
                saveUserData(action.payload.token.token,action.payload.token.refreshToken )
            }
            state.isLoading = false
        })
        builder.addCase(signin.rejected, (state, action) => {
            state.isLoading = false
            // state.token = action.payload.token
        })
    //register
        builder.addCase(register.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(register.fulfilled, (state, action) => {
            if(action.payload.message === 'success'){
                state.isLoading = false
                state.token = action.payload.token.token
                saveUserData(action.payload.token.token,action.payload.token.refreshToken )
            }else{
                state.msgError = action.payload.error
            }
        })
        builder.addCase(register.rejected, (state, action) => {
            state.isLoading = false;
        })
            //verifyEmail
            builder.addCase(registerVerification.pending, (state, action) => {
                state.isLoading = true;
            })
            
            builder.addCase(registerVerification.fulfilled, (state, action) => {
                if(action.payload.message === 'success'){
                    state.isLoading = false
                    state.token = action.payload.token.token
                    saveUserData(action.payload.token.token,action.payload.token.refreshToken )
                }else{
                    state.msgError = action.payload.error
                }
            })
            builder.addCase(registerVerification.rejected, (state, action) => {
                state.isLoading = false;
            })
        builder.addCase(signinWithToken.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(signinWithToken.fulfilled, (state, action) => {
            state.isLoading = false;
            state.token = action.payload.token
            
        })
        builder.addCase(signinWithToken.rejected, (state, action) => {
            state.isLoading = false
            state.msgError = action.payload.message
        })
    }
})

export const authReducer = authSlice.reducer;
export const {clearError} = authSlice.actions;