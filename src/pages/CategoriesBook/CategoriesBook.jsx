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
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Loading from '../../Components/ReusableComponents/Loading/Loading.jsx'
import LiveSearch from "../../Components/ReusableComponents/LiveSearch/LiveSearch.jsx";
import { baseUrl } from "../../util/util.js";


const CategoriesBook = () => {
    const { footerH, navH } = useSelector((state) => state.app);
    let { catBySlug } = useSelector((state) => state.catbook);
    let { isLoading } = useSelector((state) => state.loading);
    const [params, setParams] = useState(null);
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    let Params = useParams();

    let category = { catBySlug }.catBySlug.result;
    let totalCount = { catBySlug }.catBySlug.totalCount;
    let totalPages = Math.ceil((totalCount / 12));


    async function getBooksBySearch(searchKeyword) {
        dispatch(getCatBooksBySlug({ slug: Params.slug, keyword: searchKeyword }))
        setPage(1)
    }

    useEffect(() => {
        dispatch(getCatBooksBySlug({ slug: Params.slug, page: 1 }))
        setParams(Params)
        dispatch(removeFooterMargin());
        return () => dispatch(setFooterMargin());
    }, [Params, dispatch]);

    const url = `${baseUrl}book/category?slug=${Params.slug}&keyword=searchValue`;

    const handleChange = (e, p) => {
        setPage(p)
        dispatch(getCatBooksBySlug({ slug: Params.slug, page: p }))
    };

    return (<>
        <ScrollToTop />
        <Box sx={{ marginTop: `${navH}px`, minHeight: `calc(100vh - ${footerH + navH}px)`, }} className={styles.flex} >
            <div className={styles.badge}>
                <span className={styles.slug}>{Params.slug} books</span>
                <div className={styles.content}>
                    <Link to='/'> <i className="fa-solid fa-home"></i> </Link>
                    <span className={styles.slash}> / <Link to='/Categories'>Categories</Link> / <Link to=''>{Params.slug}</Link></span>

                </div>
            </div>
            <div className="container py-5">
                <div className={styles.searchBar}>
                    <LiveSearch minCharToSearch="1" label={`search ${Params.slug} books`} url={url} keyword="searchValue" onSubmit={getBooksBySearch} hasImage="true" navParam='book'/>
                </div>

                {isLoading ? <Loading /> : <>

                    <div className="row justify-content-center align-items-center pb-2">
                    {category?.length != 0?
                    <>
                         {category?.map((book, index) => (
                            <BookCard key={index} image={book.image?.secure_url} name={book.name} price={book.price} author={book.author} rate={book.rate} slug={book.slug} section="catBook" sectionName='without/' category={book.category?.name} />
                        ))}
                    </>
                    :<div className={styles.notFoundContainer }>
                    <p>No Books Found</p>
                    </div>}
                    </div>
                    {category && totalPages > 1 ?
                        <div className="d-flex justify-content-center align-items-center my-2">
                            <Stack spacing={2}>
                                <Pagination count={totalPages} page={page} variant="outlined" shape="rounded" color="primary" onChange={handleChange} />
                            </Stack>
                        </div>: ''
                    }
                    
                </>}
            </div>
        </Box>
    </>);
}

export default CategoriesBook;