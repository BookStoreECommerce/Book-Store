import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCatBooksBySlug, getBooksByWord } from '../../Redux/Slicies/CategoriesBookActions.js';
import BookCard from '../../Components/ReusableComponents/BookCard/BookCard.jsx'
import styles from './CategoriesBook.module.css'
import { removeFooterMargin, setFooterMargin } from "../../Redux/Slicies/appSlice";
import Box from "@mui/material/Box";
import { Link } from 'react-router-dom'
import ScrollToTop from "../../Components/ReusableComponents/ScrollToTop/ScrollToTop.jsx";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Loading from '../../Components/ReusableComponents/Loading/Loading.jsx'
import LiveSearch from "../../Components/ReusableComponents/LiveSearch/LiveSearch.jsx";
import { baseUrl } from "../../util/util.js";


const CategoriesBook = () => {
    const { footerH, navH } = useSelector((state) => state.app);
    let { catBySlug } = useSelector((state) => state.catbook);
    console.log({catBySlug});
    let category = { catBySlug }.catBySlug.result;
    let { isLoading } = useSelector((state) => state.loading);
    let { msgError } = useSelector((state) => state.auth);
    const [params, setParams] = useState(null);
    let [books, setBooks] = useState([]);
    let [numBooks, setNumBooks] = useState(0)
    const nBookPerPage = 12;
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    let Params = useParams();

    async function getCatBooks(p) {
        const response = await dispatch(getCatBooksBySlug({ slug: Params.slug, page: p }));
        if (response.type === "books/getCatBooksBySlug/fulfilled") {
            const totalCount = response.payload.totalCount;
            numBooks = Math.ceil(totalCount / nBookPerPage)
            setNumBooks(numBooks)
            setBooks(response.payload.result)
        } else {
            console.log(response.error.message);
        }
    }

    async function getBooksBySearch(searchKeyword) {
        const response = await dispatch(getBooksByWord({ slug: Params.slug, keyword: searchKeyword }))
        setNumBooks(Math.ceil(response.payload.result.length / nBookPerPage))
        setBooks(response.payload.result)
    }

    useEffect(() => {
        getCatBooks(1)
        setParams(Params)
    }, [Params]);

    useEffect(() => {
        dispatch(removeFooterMargin());
        return () => dispatch(setFooterMargin());
    }, [dispatch])

    const url = `${baseUrl}book/category?slug=${Params.slug}&keyword=searchValue`;

    const handleChange = (e, p) => {
        setPage(p)
        getCatBooks(p)
    };

    return (<>
        {isLoading ? <Loading /> : <>
            <ScrollToTop />
            <Box sx={{ marginTop: `${navH}px`, minHeight: `calc(100vh - ${footerH + navH}px)`, }} className={styles.flex} >
                <div className={styles.badge}>
                    <span className={styles.slug}>{Params.slug} books</span>
                    <div className={styles.content}>
                        <Link to='/'> <i className="fa-solid fa-home"></i> </Link>
                        <span className={styles.slash}> / <Link to='/Categories'>Categories</Link> / <Link to=''>{Params.slug}</Link></span>

                    </div>
                </div>
                <div className="container pt-1">
                    <div className="row justify-content-center align-items-center py-5">
                        {msgError ? (
                            <div className="ps-2 alert alert-danger mb-4">{msgError}</div>
                        ) : null}
                        <div className={styles.searchBar}>
                            <LiveSearch minCharToSearch="1" label={`search ${Params.slug} books`} url={url} keyword="searchValue" onSubmit={getBooksBySearch} hasImage="true" />
                        </div>
                        {books?.map((book, index) => (
                            <BookCard key={index} image={book.image?.secure_url} name={book.name} price={book.price} author={book.author} rate={book.rate} section="catBook" category={book.category?.name} />
                        ))}
                    </div>
                    {books && numBooks > 1 ?
                    <div className="d-flex justify-content-center align-items-center mb-5">
                     <Stack spacing={2}>
                            <Pagination count={numBooks} page={page} variant="outlined" shape="rounded" color="primary" onChange={handleChange} />
                        </Stack> 
                    </div>
                    : ''}
                </div>
            </Box>
        </>}

    </>);
}

export default CategoriesBook;