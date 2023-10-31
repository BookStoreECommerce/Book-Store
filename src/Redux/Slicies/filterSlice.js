import { createSlice } from "@reduxjs/toolkit";
import { booksFilter, getAllAuthors } from "./filterActions";

const initialState = {
    allAuthors: [],
    filterObj: {language: [], price: [], category: [], author: [], published: [], format: []},
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
                if(payload.name === 'price') {
                    state.filterObj.price = [payload.value];
                } 
                else if(payload.name === 'category'){
                    if (state.filterObj.category.filter((ele) => ele.name === payload.value.name).length === 0) {
                        state.filterObj.category.push(payload.value);
                    }
                }
                else {
                    if(!(state.filterObj[payload.name].includes(payload.value))) {
                        state.filterObj[payload.name].push(payload.value);
                    }
                }
            } else {
                if(payload.name === 'category'){
                    state.filterObj.category = state.filterObj.category.filter((ele) => ele.name !== payload.value.name);
                } else {
                    state.filterObj[payload.name] = state.filterObj[payload.name].filter((ele) => ele !== payload.value);
                }
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
        //getAllAuthors
        builder.addCase(getAllAuthors.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getAllAuthors.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allAuthors = action.payload.authors;
        })
        builder.addCase(getAllAuthors.rejected, (state, action) => {
            state.msgError = action.payload.error
            state.isLoading = false
        })
    }
})

export const booksFilterReducer = booksFilterSlice.reducer;
export const { setFilterObj } = booksFilterSlice.actions;