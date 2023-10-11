import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Slicies/authSlice";
import { dialogReducer } from "./Slicies/dialogSlice";
import { appReducer } from "./Slicies/appSlice";
import { categoriesBooksReducer, categoriesBooksSlugReducer,categoriesSearchBooksReducer} from './Slicies/CategoriesBookSlice.js';
import { catReducer } from "./Slicies/categoriesSlice";

const store = configureStore({
    reducer:{
        dialog: dialogReducer,
        auth: authReducer,
        app: appReducer,
        book: categoriesBooksReducer,
        catbook: categoriesBooksSlugReducer,
        bookSearchCat:categoriesSearchBooksReducer,
        loading: categoriesBooksSlugReducer,
        cat:catReducer,
    }
})

export default store;