import { createSlice } from "@reduxjs/toolkit";

const initialState = {open: false, name: "", };

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
    }
});

export const dialogReducer = dialogSlice.reducer;
export const { handleClickOpen, handleClose } = dialogSlice.actions;
