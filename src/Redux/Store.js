import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./Slicies/authSlice";
import {dialogReducer} from "./Slicies/dialogSlice";
import {appReducer} from "./Slicies/appSlice";
import {favReducer} from "./Slicies/favSlice";
import {catReducer} from "./Slicies/categoriesSlice";
import {categoriesBooksReducer,} from './Slicies/CategoriesBookSlice.js'
import {booksReducer} from "./Slicies/bookSlice";
import {whishListReducer } from "./Slicies/whishlistSlice";
import { reviewReducer } from "./Slicies/reviewsSlice";
import { booksFilterReducer } from "./Slicies/filterSlice";

const store = configureStore({
    reducer: {
        dialog: dialogReducer,
        auth: authReducer,
        app: appReducer,
        favourites: favReducer,
        book: categoriesBooksReducer,
        catbook: categoriesBooksReducer,
        loading: categoriesBooksReducer,
        cat: catReducer,
        books: booksReducer,
        whishlist:whishListReducer,
        whishListBooks:whishListReducer,
        review:reviewReducer,
        booksFilter: booksFilterReducer,
    }
})

export default store;