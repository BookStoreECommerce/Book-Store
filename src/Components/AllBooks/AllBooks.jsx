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
import AOS from "aos";
import "aos/dist/aos.css";
import Loading from '../ReusableComponents/Loading/Loading';
function AllBook({ sectionName }) {

  useEffect(() => {
    AOS.init();
    window.addEventListener('load', AOS.refresh);
  }, []);

  let [books, setBooks] = useState([]);
  let [searchWord, setSearchWord] = useState('');
  let [numOfPages, setNumOfPages] = useState(0)
  let { isLoading, msgError } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const nBookPerPage = 12;
  const [pageNumber, setPageNumber] = useState(1);

  const { footerH, navH } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(removeFooterMargin());
    return () => dispatch(setFooterMargin());
  }, [dispatch]);

  const handleChange = (e, pageNumber) => {
    isLoading = true;
    console.log(isLoading);
    setPageNumber(pageNumber);
  };

  // get all books
  async function getBooks() {
    const response = await dispatch(getAllBooks({ pageNumber, searchWord }));

    if (response.type === "books/fulfilled") {
      const totalCountOfBooks = response.payload.totalCount;
      numOfPages = Math.ceil(totalCountOfBooks / nBookPerPage)
      setNumOfPages(numOfPages)
      setBooks(response.payload.result)
    } else {
      console.log(response);
    }
  }

  // filter books by search
  async function getBooksBySearch(searchKeyword) {
    const response = await dispatch(getBooksByWord(searchKeyword));
    setSearchWord(searchKeyword)
    const totalCountOfBooks = response.payload.totalCount;
    console.log("totalCountOfBooks", totalCountOfBooks);
    if (response.type === "books/fulfilled") {
      setNumOfPages(Math.ceil(totalCountOfBooks / nBookPerPage))
      console.log("numOfPages", numOfPages);
      setBooks(response.payload.result)
    } else {
      console.log(msgError);
    }
  }

  useEffect(() => {
    getBooks()
  }, [pageNumber])


  const url = `${baseUrl}book/?keyword=searchValue`;

  return (
    <>
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
            <LiveSearch minCharToSearch="1" label="search books" url={url} keyword="searchValue" hasImage='true' onSubmit={getBooksBySearch} />
          </div>
          {books?.map((book, index) => (
            <div key={index} className={` col-lg-3 col-sm-6 col-12 mb-5 ${styles.bookCard}`}>
              <BookCard key={book.id} image={book.image.secure_url} category={book.category} desc={book.desc} name={book.name} price={book.price} author={book.author} rate={book.rate} section={sectionName} />
            </div>
          ))}

        </div>

        {books && numOfPages > 1 ? <div className="my-5 pt-5 d-flex justify-content-center">
          <Stack spacing={2}>
            <Pagination count={numOfPages} page={pageNumber} size="large" shape="rounded" variant="outlined" color="primary" onChange={handleChange} />
          </Stack>
        </div> : ''}

      </Box>}

    </>
  )
}

export default AllBook