import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Slicies/authSlice";


const store = configureStore({
    reducer:{
        auth: authReducer
    }
})

export default store;