import {createSlice} from "@reduxjs/toolkit";

const initialState = {categories:[1,2,3]};


const catSlice = createSlice({
    name:'categories',
    initialState,
    reducers:{
        getCategories: ()=>{
            console.log("categories");
        }
    }
})

export const catReducer = catSlice.reducer;

export const getCategories = catSlice.actions.getCategories;