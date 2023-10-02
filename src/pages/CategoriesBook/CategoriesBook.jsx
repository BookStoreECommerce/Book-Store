import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCatBooksBySlug } from '../../Redux/Slicies/CategoriesBookActions.js';
import BookCard from '../../Components/ReusableComponents/BookCard/BookCard.jsx'
import styles from './CategoriesBook.module.css'
import { removeFooterMargin, setFooterMargin} from "../../Redux/Slicies/appSlice";
import Box from "@mui/material/Box";


const CategoriesBook = () => {
    const { footerH, navH } = useSelector((state) => state.app);
    let { catBySlug } = useSelector((state) => state.catbook);
    let category = { catBySlug }.catBySlug.book;
    let [params, setParams] = useState(null);

    let Params = useParams();
    const dispatch = useDispatch();
    
    console.log(Params.slug);
    console.log(category);

    useEffect(() => {
        setParams(Params)
        dispatch(getCatBooksBySlug(Params.slug))
        dispatch(removeFooterMargin());
        return () => dispatch(setFooterMargin());
    }, [Params,dispatch]);

return (<>
<Box sx={{marginTop: `${navH}px`, minHeight: `calc(100vh - ${footerH + navH}px)`,}} className={styles.flex}>
    {/* <div className={`col-lg-2 ${styles.sidebar}`}>
 
    </div>
    <div className="col-lg-10"> */}

                <div className="container mt-5 pt-1">
                    <div className="row justify-content-center align-items-center pt-5">
                        <div className="SearchBar mb-5 position-relative">
                            <i className={`fa-solid fa-search position-absolute ${styles.iconPosition}`}></i>
                            <input type="text" className={`form-control rounded-pill ${styles.searchBar}`} placeholder="Search ....." />
                        </div>
                        {category?.map((book, index) => (
                            <BookCard key={index} image={book.image?.secure_url} name={book.bookName} price={book.price} author={book.author} rate={book.rate} section="catBook" />
                        ))}
                    </div>
            </div>

    {/* </div> */}
</Box>
</>);
}

export default CategoriesBook;