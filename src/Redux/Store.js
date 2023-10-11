import {
    configureStore
} from "@reduxjs/toolkit";
import {
    authReducer
} from "./Slicies/authSlice";
import {
    dialogReducer
} from "./Slicies/dialogSlice";
import {
    appReducer
} from "./Slicies/appSlice";
import {
    favReducer
} from "./Slicies/favSlice";
import {
    catReducer
} from "./Slicies/categoriesSlice";

import {
    categoriesBooksReducer,
    // categoriesBooksSlugReducer
} from './Slicies/CategoriesBookSlice.js'
import {
    booksReducer
} from "./Slicies/bookSlice";

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
        books: booksReducer
    }
})

export default store;