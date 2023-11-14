import { createSlice } from "@reduxjs/toolkit";

const initialState = {open: false, name: "", privacyOpen: false, reviewOpen: false};

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
        handleReviewOpen: (state, action) => {
            state.reviewOpen = true;
        },
        handleReviewClose: (state, action) => {
            state.reviewOpen = false;
        },
    }
});

export const dialogReducer = dialogSlice.reducer;
export const { handleReviewOpen,handleReviewClose, handleClickOpen, handleClose, handlePrivacyOpen, handlePrivacyClose } = dialogSlice.actions;
