import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Slicies/authSlice";
import { dialogReducer } from "./Slicies/dialogSlice";
import { appReducer } from "./Slicies/appSlice";
import { categoriesBooksReducer, categoriesBooksSlugReducer} from './Slicies/CategoriesBookSlice.js'
import { bookReducer } from "./Slicies/bookSlice";
import { catReducer } from "./Slicies/categoriesSlice";


const store = configureStore({
    reducer:{
        dialog: dialogReducer,
        auth: authReducer,
        app: appReducer,
        book: categoriesBooksReducer,
        catbook: categoriesBooksSlugReducer,
        loading: categoriesBooksSlugReducer,
        books: bookReducer
    }
})

export default store;