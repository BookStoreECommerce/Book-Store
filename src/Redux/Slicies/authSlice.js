import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios-instance";

const initialState = {
    user: null,
    isLoading: false,
    token: null,
    msgError: null
}

export const signin = createAsyncThunk("auth/signin", async (values, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.post('auth/signin', values);
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const register = createAsyncThunk("auth/signup", async (userData, { rejectWithValue }) => {
    try {
        let { data } = await axiosInstance.post('auth/signup', userData);
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});


export const registerVerification = createAsyncThunk("auth/verifyEmail", async (verifycode, { rejectWithValue }) => {
    try {
        let { data } = await axiosInstance.post(`auth/verifyEmail`, { code: verifycode },
            {
                headers:
                    { authorization: localStorage.getItem("access-token") }
            });
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const userProfile = createAsyncThunk("users/update", async (userData, { rejectWithValue }) => {
    try {
        let { data } = await axiosInstance.put(`users/update`, userData, {
            headers: {
                authorization: localStorage.getItem("access-token")
            }
        });
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

export const getUserProfile = createAsyncThunk("users/profile", async (_, { rejectWithValue }) => {
    try {
        let { data } = await axiosInstance.get(`users/profile`,
            {
                headers:
                    { authorization: localStorage.getItem("access-token") }
            });
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const forgetPassword = createAsyncThunk(
    "auth/forgetPassword",
    async (values = {email: localStorage.getItem('user-mail')}, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('auth/forgetPassword', values)
            localStorage.setItem('user-mail', values.email);
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
        let { data } = await axiosInstance.post(`auth/signin/${token}`);
        return data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data)
    }
})

const saveUserData = (token) => {
    localStorage.setItem("access-token", token);
};

const authSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        clearError: (state) => {
            state.msgError = null;
        },
        setUser: (state, action) => {
            const {name , value} = action.payload;
            let user = state.user;
            user[name] = value;
            state.user = user;
        }
    },
    extraReducers: builder => {
        //login
        builder.addCase(signin.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(signin.fulfilled, (state, action) => {
            const token = action.payload.token
            saveUserData(token)
            state.token = token
            state.isLoading = false;

        })
        builder.addCase(signin.rejected, (state, action) => {
            state.msgError = action.payload.error
            state.isLoading = false
        })
        //register
        builder.addCase(register.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(register.fulfilled, (state, action) => {
            const token = action.payload.token
            state.isLoading = false
            state.token = token
            saveUserData(token)
        })
        builder.addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            state.msgError = action.payload.error
        })
        //verifyEmail
        builder.addCase(registerVerification.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(registerVerification.fulfilled, (state, action) => {
            const token = action.payload.token
            state.isLoading = false
            state.token = token
            saveUserData(token)
        })
        builder.addCase(registerVerification.rejected, (state, action) => {
            state.msgError = action.payload.error
            state.isLoading = false;
        })
        // signinWithToken
        //login with social account
        builder.addCase(signinWithToken.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(signinWithToken.fulfilled, (state, action) => {
            const token = action.payload.token;
            state.isLoading = false;
            state.token = token
            saveUserData(token)
        //  redirect('/')
        })
        builder.addCase(signinWithToken.rejected, (state, action) => {
            state.isLoading = false
            state.msgError = action.payload.error
        })

        // userProfile
        builder.addCase(userProfile.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(userProfile.fulfilled, (state, action) => {
            state.isLoading = false;

        })
        builder.addCase(userProfile.rejected, (state, action) => {
            state.isLoading = false
            state.msgError = action.payload.message
        })
        // getUserProfile
        builder.addCase(getUserProfile.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getUserProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user
        })
        builder.addCase(getUserProfile.rejected, (state, action) => {
            state.isLoading = false
            state.msgError = action.payload.message
        })

        //forget password
        builder.addCase(forgetPassword.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(forgetPassword.fulfilled, (state, action) => {
            const token = action.payload.token
            state.token = token;
            saveUserData(token);
            state.msgError = null;
            // state.resetPasswordMessage = action.payload;
            state.isLoading = false;

        });
        builder.addCase(forgetPassword.rejected, (state, action) => {
            state.msgError = action.payload.error
            state.isLoading = false;
        });

        //verify password email
        builder.addCase(varifyPasswordEmail.pending, (state, action) => {
            state.msgError = null;
            state.isLoading = true;
        });
        builder.addCase(varifyPasswordEmail.fulfilled, (state, action) => {
            state.isLoading = false;

        });
        builder.addCase(varifyPasswordEmail.rejected, (state, action) => {
            state.msgError = action.payload.error
            state.isLoading = false;
        });
        //reset password 
        builder.addCase(resetPassword.pending, (state, action) => {
            state.msgError = null;
            state.isLoading = true;
        });
        builder.addCase(resetPassword.fulfilled, (state, action) => {
            // const token = action.payload.token
            // state.token = token;
            // saveUserData(token);
            state.isLoading = false;
            localStorage.removeItem('access-token');
            localStorage.removeItem('user-mail');
        });
        builder.addCase(resetPassword.rejected, (state, action) => {
            state.msgError = action.payload.error
            state.isLoading = false;
        });
    }
})

export const authReducer = authSlice.reducer;
export const { clearError, setUser } = authSlice.actions;
