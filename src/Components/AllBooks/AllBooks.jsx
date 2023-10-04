import React, { useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
// import axios from 'axios'
// import book from '../../assets/1.jpg'
// import book2 from '../../assets/2.jpg'
// import book3 from '../../assets/3.jpg'
// import book4 from '../../assets/4.jpg'
// import book5 from '../../assets/5.jpg'
// import book6 from '../../assets/6.jpg'
// import book7 from '../../assets/7.jpg'
// import book8 from '../../assets/8.jpg'
// import book9 from '../../assets/9.jpg'
// import book10 from '../../assets/10.jpg'
// import book11 from '../../assets/11.jpg'
// import book12 from '../../assets/12.jpg'
// import { baseUrl } from '../../util/util'
// import axiosInstance from '../../axios/axios-instance'
// import { isRejectedWithValue } from '@reduxjs/toolkit'
import BookCard from '../ReusableComponents/BookCard/BookCard'
import styles from './AllBooks.module.css'
import { getAllBooks, getAllBooksNumber } from "../../Redux/Slicies/authActions";
import { useDispatch, useSelector } from 'react-redux'
import { Typography } from '@mui/material';

function AllBook({ sectionName }) {
  let [books, setBooks] = useState([]);
  let [numBooks, setNumBooks] = useState(0)
  const { msgError } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const nBookPerPage = 12;
  const [page, setPage] = useState(1);
  const handleChange = (e, page) => {
    console.log(page);
    setPage(page);
  };
  
  async function getBooks() {
    const response = await dispatch(getAllBooks(page)); 

    if (response.type === "books/fulfilled") {
      const totalCount = response.payload.totalCount;
      const numBooks = Math.ceil(totalCount / nBookPerPage)
      setNumBooks(numBooks)
      setBooks(response.payload.result)
      
    } else {
      console.log(response.error.message);
    }
  }
  useEffect(() => {
    getBooks()
  }, [page])

  return (
    <>
      <div className='row'>
        {msgError ? (
          <div className="ps-2 alert alert-danger mb-4">{msgError}</div>
        ) : null}
        {books?.map((book, index) => (
          <div key={index} className={` col-lg-3 col-sm-6 col-12 mb-5 ${styles.bookCard}`}>
            <BookCard key={book.id} image={book.image.secure_url} category={book.category} desc={book.desc} name={book.name} price={book.price} author={book.author} rate={book.rate} section={sectionName} />
          </div>
        ))}
      </div>

      <div className="mt-5 pt-5 d-flex justify-content-center">
        <Stack spacing={2}>
          <Typography>Page: {page}</Typography>
          <Pagination count={numBooks} page={page} size="large" shape="rounded" variant="outlined" color="primary" onChange={handleChange} />
        </Stack>
      </div>
    </>
  )
}

export default AllBook