import { createSlice } from "@reduxjs/toolkit";
import store from "../Store";


const initialState = {
    footerH:0,
    navH:0,
    footerMargin:true,
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers:{
        setHeight: (state, action) => {
            const {footerH, navH} = action.payload;
            state.footerH = footerH;
            state.navH = navH;
        },
        setFooterMargin: (state, action) => {
            state.footerMargin = true;
        },
        removeFooterMargin: (state, action) => {
            state.footerMargin = false;
        }
    }
});

export const appReducer = appSlice.reducer;
export const appState = () => store.getState().app
export const { setHeight, setFooterMargin, removeFooterMargin } = appSlice.actions;