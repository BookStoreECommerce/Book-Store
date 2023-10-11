import React, { useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import BookCard from '../ReusableComponents/BookCard/BookCard'
import styles from './AllBooks.module.css'
import { getAllBooks, getBooksByWord } from "../../Redux/Slicies/bookActions";
import { useDispatch, useSelector } from 'react-redux'
import LiveSearch from '../ReusableComponents/LiveSearch/LiveSearch';
import { baseUrl } from '../../util/util';
import { removeFooterMargin, setFooterMargin } from '../../Redux/Slicies/appSlice';
import { Box } from '@mui/material';
import ScrollToTop from '../ReusableComponents/ScrollToTop/ScrollToTop';

function AllBook({ sectionName }) {
  let [books, setBooks] = useState([]);
  let [numBooks, setNumBooks] = useState(0)
  const { isLoading, msgError } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const nBookPerPage = 12;
  const [page, setPage] = useState(1);

  const { footerH, navH } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(removeFooterMargin());
    return () => dispatch(setFooterMargin());
  }, [dispatch]);

  const handleChange = (e, page) => {
    console.log(page);
    setPage(page);
  };

  async function getBooks() {
    const response = await dispatch(getAllBooks(page));

    if (response.type === "books/fulfilled") {
      const totalCount = response.payload.totalCount;
      numBooks = Math.ceil(totalCount / nBookPerPage)
      setNumBooks(numBooks)
      setBooks(response.payload.result)
      // console.log('zzzzzzzzzz ', response.payload.result)

    } else {
      console.log(response.error.message);
    }
  }
  async function getBooksBySearch(searchKeyword) {

    const response = await dispatch(getBooksByWord(searchKeyword));
    console.log(response.payload.result)
    setNumBooks(Math.ceil(response.payload.result?.length / nBookPerPage))
    // console.log(response.payload.result.length)
    setBooks(response.payload.result)
  }
  useEffect(() => {

    getBooks()
  }, [page])


  // const searchBooks = (searchKeyword) => {
  //   getBooksBySearch(searchKeyword)
  // }
  const url = `${baseUrl}book/?keyword=searchValue`;

  return (
    <>
      <ScrollToTop />

      <Box
        sx={{
          marginTop: `${navH}px`,
          minHeight: `calc(100vh - ${footerH + navH}px)`,
        }}
      >
        <div className='row'>
          {msgError ? (
            <div className="ps-2 alert alert-danger mb-4">{msgError}</div>
          ) : null}
          <div className=''>
            <LiveSearch minCharToSearch="1" label="search books" url={url} keyword="searchValue" onSubmit={getBooksBySearch} hasImage="true" />
          </div>
          {books?.map((book, index) => (
            <div key={index} className={` col-lg-3 col-sm-6 col-12 mb-5 ${styles.bookCard}`}>
              <BookCard key={book.id} image={book.image.secure_url} category={book.category.name} desc={book.desc} name={book.name} price={book.price} author={book.author} rate={book.rate} section={sectionName} />
            </div>
          ))}

        </div>

        <div className="my-5 pt-5 d-flex justify-content-center">
          {books && numBooks > 1 ? <Stack spacing={2}>
            <Pagination count={numBooks} page={page} variant="outlined" shape="rounded" color="primary" onChange={handleChange} />
          </Stack> : ''}
        </div>
      </Box>
    </>
  )
}

export default AllBook