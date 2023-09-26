import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Slicies/authSlice";
import { dialogReducer } from "./Slicies/dialogSlice";
import { appReducer } from "./Slicies/appSlice";


const store = configureStore({
    reducer:{
        dialog: dialogReducer,
        auth: authReducer,
        app: appReducer,
    }
})

export default store;