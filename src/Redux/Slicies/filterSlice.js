import { createSlice } from "@reduxjs/toolkit";
import { booksFilter, getAllAuthors } from "./filterActions";

const date = new Date();
const thisYear = date.getFullYear();
const finalpubDateCheck = `2020-${thisYear}`;

const initialState = {
    allAuthors: [],
    filterObj: {language: [], price: [], category: [], author: [], published: [], format: []},
    filter: '',
    filterLoading: false,
    filterCheckBtns: {English: false, Arabic: false, "0-2000": false, "2000-2010": false, "2010-2020": false, finalpubDateCheck: false},
    msgError: null,
}

const booksFilterSlice = createSlice({
    name: "booksFilter",
    initialState,
    reducers: {
        handleFilterCheck: (state, {payload}) => {
            state.filterCheckBtns[payload.checkName] = payload.check;
        },
        setFilter: (state, {payload}) => {
            state.filter = payload;
        },
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
        },
        clearFilterObj: (state, {payload}) => {
            state.filter = '';
            state.filterCheckBtns = {English: false, Arabic: false, "0-2000": false, "2000-2010": false, "2010-2020": false, finalpubDateCheck: false};
            state.filterObj = {language: [], price: [], category: [], author: [], published: [], format: []};
        },
    },
    extraReducers: builder => {
        //booksFilter
        builder.addCase(booksFilter.pending, (state, action) => {
            state.filterLoading = true
        })
        builder.addCase(booksFilter.fulfilled, (state, action) => {
            state.filterLoading = false;
        })
        builder.addCase(booksFilter.rejected, (state, action) => {
            state.msgError = action.payload.error
            state.filterLoading = false
        })
        //getAllAuthors
        builder.addCase(getAllAuthors.pending, (state, action) => {
            state.filterLoading = true
        })
        builder.addCase(getAllAuthors.fulfilled, (state, action) => {
            state.filterLoading = false;
            state.allAuthors = action.payload.authors;
        })
        builder.addCase(getAllAuthors.rejected, (state, action) => {
            state.msgError = action.payload.error
            state.filterLoading = false
        })
    }
})

export const booksFilterReducer = booksFilterSlice.reducer;
export const { setFilterObj, setFilter, handleFilterCheck, clearFilterObj } = booksFilterSlice.actions;