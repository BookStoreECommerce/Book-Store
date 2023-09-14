import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Slicies/authSlice";
import { dialogReducer } from "./Slicies/dialogSlice";


const store = configureStore({
    reducer:{
        auth: authReducer,
        dialog: dialogReducer,
    }
})

export default store;