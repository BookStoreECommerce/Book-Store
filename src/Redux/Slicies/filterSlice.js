import { createSlice } from "@reduxjs/toolkit";
import { booksFilter } from "./filterActions";

const initialState = {
    filterObj: {language: [], price: [], category: [], author: [], publication: []},
    filter: [],
    isLoading: false,
    msgError: null,
}

const booksFilterSlice = createSlice({
    name: "booksFilter",
    initialState,
    reducers: {
        setFilterObj: (state, {payload}) => {
            if (payload.method === 'add') {
                state.filterObj[payload.name].push(payload.value);
            } else {
                state.filterObj[payload.name] = state.filterObj[payload.name].filter((ele) => ele !== payload.value);
            }
        }
    },
    extraReducers: builder => {
        //booksFilter
        builder.addCase(booksFilter.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(booksFilter.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(booksFilter.rejected, (state, action) => {
            state.msgError = action.payload.error
            state.isLoading = false
        })
    }
})

export const booksFilterReducer = booksFilterSlice.reducer;
export const { setFilterObj } = booksFilterSlice.actions;