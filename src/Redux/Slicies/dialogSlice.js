import { createSlice } from "@reduxjs/toolkit";

const initialState = {open: false, status: '', registerShow:false, loginShow:false};

const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        handleClickOpen: (state, action) => {
            state.open = !state.open;
        },
        handleClose: (state, action) => {
            state.registerShow = false
            state.loginShow = false
        },
        setDialogContent: (state, action) => {
            state.status = action.payload;
        },
        registerModal:(state, action)=>{
            state.registerShow = true
        },
        loginModal:(state, action)=>{
            state.loginShow = true
        }
    }
});

export const dialogReducer = dialogSlice.reducer;
export const {handleClickOpen, handleClose, setDialogContent, registerModal, loginModal} = dialogSlice.actions;
