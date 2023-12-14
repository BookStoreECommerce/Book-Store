import { createSlice } from "@reduxjs/toolkit";
import { getOrders} from "./orderAction";

const initialState = {
    orders: [],
    // pdfBooks: [],
    isLoading: false,
    msgError: null,

}

const ordersSlice = createSlice({
    name: "allOrders",
    initialState,
    reducers:{

    },
    extraReducers: builder => {
        // getAllOrders
        builder.addCase(getOrders.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getOrders.fulfilled, (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            state.orders = action.payload;
            // state.pdfBooks = action.payload.pdfBooks;
           
        })
        builder.addCase(getOrders.rejected, (state, action) => {
            state.isLoading = false

        })


    }
})
export const ordersReducer = ordersSlice.reducer;
