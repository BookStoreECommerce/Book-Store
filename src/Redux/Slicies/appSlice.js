import { createSlice } from "@reduxjs/toolkit";
import store from "../Store";


const initialState = {
    footerH:0,
    navH:0,
    footerMargen:96,
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers:{
        setHeight: (state, action) => {
            const {footerH, navH} = action.payload;
            state.footerH = footerH;
            state.navH = navH;
        }
    }
});

export const appReducer = appSlice.reducer;
export const appState = () => store.getState().app
export const { setHeight } = appSlice.actions;