import { createSlice } from "@reduxjs/toolkit";

const initialState = {open: false, status: '', registerShow:false, loginShow:false, registerVerifyShow:false};

const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        handleClickOpen: (state, action) => {
            state.open = !state.open;
        },
        handleClose: (state, action) => {
            state.registerShow = false;
            state.loginShow = false;
            state.registerVerifyShow = false;
        },
        setDialogContent: (state, action) => {
            state.status = action.payload;
        },
        registerModal:(state, action)=>{
            state.registerShow = true;
            state.loginShow = false;
            state.registerVerifyShow = false;
        },
        loginModal:(state, action)=>{
            state.loginShow = true;
            state.registerShow = false;
            state.registerVerifyShow = false;
        },
        registerVerifyModal:(state, action)=>{
            state.registerVerifyShow = true;
            state.registerShow = false;
            state.loginShow = false;
        }
    }
});

export const dialogReducer = dialogSlice.reducer;
export const {handleClickOpen, handleClose, setDialogContent, registerModal, loginModal, registerVerifyModal} = dialogSlice.actions;
