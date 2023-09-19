import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Slicies/authSlice";
import { dialogReducer } from "./Slicies/dialogSlice";


const store = configureStore({
    reducer:{
        dialog: dialogReducer,
        auth: authReducer,
    }
})

export default store;