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
    let {isLoading } = useSelector((state)=>state.loading);
    let category = { catBySlug }.catBySlug.book;
    let Params = useParams();
    const [params, setParams] = useState(null);
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();

    console.log(category);
 

    useEffect(() => {
        dispatch(getCatBooksBySlug(Params.slug))
        setParams(Params)
    }, [Params]);

    useEffect(() => {
        dispatch(removeFooterMargin());
        return () => dispatch(setFooterMargin());
    }, [dispatch])

const searchBooks = (searchKeyword) => {
  console.log(searchKeyword);
}

const url = `${baseUrl}category?page=1&sort=name&keyword=searchValue&fields=name,image`;
    const handleChange = (e, p) => {
        console.log(p);
        setPage(p);
      };

    return (<>
    {isLoading?<Loading/>:<>
    <ScrollToTop />
        <Box sx={{ marginTop: `${navH}px`, minHeight: `calc(100vh - ${footerH + navH}px)`, }} className={styles.flex}>
            <div className={styles.badge}>
                <span className={styles.slug}>{category ? category[0].category.name : ''} books</span>
                <div className={styles.content}>
                    <Link to='/'> <i className="fa-solid fa-home"></i> </Link>
                    <span className={styles.slash}> / <Link to='/Categories'>Categories</Link> / <Link to=''>{category ? category[0].category.name : ''}</Link></span>

                </div>
            </div>
            <div className="container pt-1">
                <div className="row justify-content-center align-items-center py-5">
                    <div className={styles.searchBar}>
                     <LiveSearch minCharToSearch="1" label={`Search ${Params.slug} Books`} url={url} keyword="searchValue" onSubmit={searchBooks} />
                    </div>
                    {category?.map((book, index) => (
                        <BookCard key={index} image={book.image?.secure_url} name={book.name} price={book.price} author={book.author} rate={book.rate} section="catBook" category={book.category?.name} />
                    ))}
                </div>
              <div className="d-flex justify-content-center align-items-center mb-5">
              {category?.length > 12 ? <Stack spacing={2}>
                   
                   <Pagination count={3} variant="outlined" shape="rounded" color="primary" onChange={handleChange}/>
               </Stack> : ''}
              </div>
            </div>
        </Box>
    </>}
        
    </>);
}

export default CategoriesBook;