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

  // let [books, setBooks] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  // const { isLoading, msgError } = useSelector((state) => state.auth);
  const [numOfPages, setNumOfPages] = useState(0)
  const { isLoading, msgError, books, totalCount } = useSelector((state) => state.books);
  const nBookPerPage = 12;
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const { footerH, navH } = useSelector((state) => state.app);


  useEffect(() => {
    dispatch(removeFooterMargin());
    return () => dispatch(setFooterMargin());
  }, [dispatch]);

  const handleChange = (e, pageNumber) => {
    setPageNumber(pageNumber);
  };

  // get all books
  async function getBooks() {
    await dispatch(getAllBooks(pageNumber));
  }

  // filter books by search
  async function getBooksBySearch(searchKeyword) {
    await dispatch(getBooksByWord({ pageNumber, searchKeyword }));
    setSearchWord(searchKeyword)
  }

  useEffect(() => {
    if (searchWord === '') {
      getBooks()
    } else {
      getBooksBySearch(searchWord)
    }

  }, [pageNumber])

  useEffect(() => {
    setNumOfPages(Math.ceil(totalCount / nBookPerPage))
  }, [totalCount])

  const url = `${baseUrl}book/?keyword=searchValue`;

  return (
    <>
      <Box
        sx={{
          marginTop: `${navH}px`,
          minHeight: `calc(100vh - ${footerH + navH}px)`,
        }}
      >
        {msgError ? <h1 className="ps-2  text-danger mb-4">{msgError}</h1>
          : (<div className='row'>
            <div className=''>
              <LiveSearch minCharToSearch="1" label="search books" url={url} keyword="searchValue" hasImage='true' onSubmit={getBooksBySearch} pageNumber={setPageNumber} />
            </div>
            {totalCount === 0 && !isLoading ? <h1 className='text-danger text-center my-5'>No Books Found <i className="fa-solid fa-face-frown"></i>, Search again.</h1> :( isLoading ? <Loading /> : books.length > 0 ? books.map((book, index) => (
              <div key={index} className={` col-lg-3 col-sm-6 col-12 mb-5 ${styles.bookCard}`}>
                <BookCard key={book.id} image={book.image.secure_url} category={book.category} desc={book.desc} name={book.name} price={book.price} author={book.author} rate={book.rate} section={sectionName} />
              </div>
            )) : <Loading />)}
           

          </div>)}


        {books && numOfPages > 1 ? <div className="my-5 pt-5 d-flex justify-content-center">
          <Stack spacing={2}>
            <Pagination count={numOfPages} page={pageNumber} size="large" shape="rounded" variant="outlined" color="primary" onChange={handleChange} />
          </Stack>
        </div> : <div className="my-5 pt-5 d-flex justify-content-center"></div>}

      </Box>

    </>
  )
}

export default AllBook