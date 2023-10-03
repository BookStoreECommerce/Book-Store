import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCatBooksBySlug } from '../../Redux/Slicies/CategoriesBookActions.js';
import BookCard from '../../Components/ReusableComponents/BookCard/BookCard.jsx'
import styles from './CategoriesBook.module.css'
import { removeFooterMargin, setFooterMargin } from "../../Redux/Slicies/appSlice";
import Box from "@mui/material/Box";
import { Link } from 'react-router-dom'
import ScrollToTop from "../../Components/ReusableComponents/ScrollToTop/ScrollToTop.jsx";




const CategoriesBook = () => {
    const { footerH, navH } = useSelector((state) => state.app);
    let { catBySlug } = useSelector((state) => state.catbook);
    let category = { catBySlug }.catBySlug.book;
    let [params, setParams] = useState(null);
    const [paginate, setPaginate] = useState(12);
    const load_more = (e) => {
        setPaginate((prevValue) => prevValue + 12);
    }

    let Params = useParams();
    const dispatch = useDispatch();

    console.log(Params.slug);
    console.log(category);

    useEffect(() => {
        setParams(Params)
        dispatch(getCatBooksBySlug(Params.slug))
    }, [Params]);

    useEffect(() => {
        dispatch(removeFooterMargin());
        return () => dispatch(setFooterMargin());
    }, [dispatch])

    return (<>
        <ScrollToTop />
        <Box sx={{ marginTop: `${navH}px`, minHeight: `calc(100vh - ${footerH + navH}px)`, }} className={styles.flex}>
            <div className={styles.badge}>
                <span className={styles.slug}>{category[0].category.name} books</span>
                <div className={styles.content}>
                    <Link to='/'> <i className="fa-solid fa-home"></i> </Link>
                    <span className={styles.slash}> / <Link to='/Categories'>Categories</Link> / <Link to=''>{category[0].category.name}</Link></span>

                </div>
            </div>
            <div className="container pt-1">
                <div className="row justify-content-center align-items-center py-5">
                    <div className={styles.searchBar}>
                        <i className={`fa-solid fa-search ${styles.searchicon}`}></i>
                        <input type="text" className={`form-control rounded-pill ${styles.form}`} placeholder="search ....." />

                    </div>
                    {category?.slice(0,paginate).map((book, index) => (
                        <BookCard key={index} image={book.image?.secure_url} name={book.name} price={book.price} author={book.author} rate={book.rate} section="catBook" category={book.category?.name} />
                    ))}
                </div>

                { paginate <= category?.length ? <button onClick={ load_more } className={`btn mx-auto d-flex py-2 px-3 fs-6 mb-5 ${styles.btnMore}`}>More Books.... </button>:null}
            </div>
        </Box>
    </>);
}

export default CategoriesBook;