import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Slicies/authSlice";
import { dialogReducer } from "./Slicies/dialogSlice";
import { appReducer } from "./Slicies/appSlice";
import { categoriesBooksReducer, categoriesBooksSlugReducer} from './Slicies/CategoriesBookSlice.js'
import { catReducer } from "./Slicies/categoriesSlice";
import { booksReducer } from "./Slicies/bookSlice.js";


const store = configureStore({
    reducer:{
        dialog: dialogReducer,
        auth: authReducer,
        app: appReducer,
        book: categoriesBooksReducer,
        catbook: categoriesBooksSlugReducer,
        loading: categoriesBooksSlugReducer,
        cat:catReducer,
        books : booksReducer,
    }
})

export default store;