import { createSlice } from "@reduxjs/toolkit";

const initialState = {open: false, name: "", privacyOpen: false};

const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        handleClickOpen: (state, action) => {
            state.open = true;
            state.name = action.payload.name;
        },
        handleClose: (state, action) => {
            state.open = false;
            state.name = ""
        },
        handlePrivacyOpen: (state, action) => {
            state.privacyOpen = true;
        },
        handlePrivacyClose: (state, action) => {
            state.privacyOpen = false;
        },
    }
});

export const dialogReducer = dialogSlice.reducer;
export const { handleClickOpen, handleClose, handlePrivacyOpen, handlePrivacyClose } = dialogSlice.actions;
