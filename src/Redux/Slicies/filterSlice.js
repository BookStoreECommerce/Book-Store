import { createSlice } from "@reduxjs/toolkit";
import { booksFilter, getAllAuthors } from "./filterActions";

const initialState = {
    allAuthors: [],
    filterObj: {language: [], price: [], category: [], author: [], published: [], format: [], rating: [], stock: []},
    filter: '',
    filterLoading: false,
    filterCheckBtns: {},
    filterRadioBtns: {},
    msgError: null,
}

const booksFilterSlice = createSlice({
    name: "booksFilter",
    initialState,
    reducers: {
        handleFilterCheck: (state, {payload}) => {
            if(state.filterCheckBtns.hasOwnProperty(payload)){
                state.filterCheckBtns[payload] = !state.filterCheckBtns[payload];
            } else {
                state.filterCheckBtns[payload] = true;
            }
        },
        handleFilterRadio: (state, {payload}) => {
            if(state.filterRadioBtns.hasOwnProperty(payload)){
                state.filterRadioBtns[payload] = false;
            } else {
                state.filterRadioBtns = {};
                state.filterRadioBtns[payload] = true;
            }
        },
        setFilter: (state, {payload}) => {
            state.filter = payload;
        },
        setFilterObj: (state, {payload}) => {
            if (payload.method === 'add') {
                if(payload.name === 'price' || payload.name === 'format') {
                    state.filterObj[payload.name] = [payload.value];
                } 
                else if(payload.name === 'category'){
                    if (state.filterObj[payload.name].filter((ele) => ele.name === payload.value.name).length === 0) {
                        state.filterObj[payload.name].push(payload.value);
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
            state.filterCheckBtns = {}
            state.filterRadioBtns = {}
            state.filterObj = {language: [], price: [], category: [], author: [], published: [], format: [], rating: [], stock: []};
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
export const { setFilterObj, setFilter, handleFilterCheck, handleFilterRadio, clearFilterObj } = booksFilterSlice.actions;