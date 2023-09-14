import { createSlice } from "@reduxjs/toolkit";

const initialState = {open: false, status: ''};

const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        handleClickOpen: (state, action) => {
            state.open = true;
        },
        handleClose: (state, action) => {
            state.open = false;
        },
        setDialogContent: (state, action) => {
            state.status = action.payload;
        }
    }
});

export const dialogReducer = dialogSlice.reducer;
export const {handleClickOpen, handleClose, setDialogContent} = dialogSlice.actions;
