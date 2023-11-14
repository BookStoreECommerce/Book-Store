import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import BookCard from "../ReusableComponents/BookCard/BookCard";
import styles from "./AllBooks.module.css";
import { getAllBooks, getBooksByWord } from "../../Redux/Slicies/bookActions";
import { useDispatch, useSelector } from "react-redux";
import LiveSearch from "../ReusableComponents/LiveSearch/LiveSearch";
import { baseUrl } from "../../util/util";
import AOS from "aos";
import "aos/dist/aos.css";
import Loading from "../ReusableComponents/Loading/Loading";
import { handleFilterCheck, handleFilterRadio, setFilterObj } from "../../Redux/Slicies/filterSlice";
import { booksFilter } from "../../Redux/Slicies/filterActions";
import { setBooksPageNumber } from "../../Redux/Slicies/bookSlice";
function AllBook({ sectionName }) {
  useEffect(() => {
    AOS.init();
    window.addEventListener("load", AOS.refresh);
  }, []);

  const [searchWord, setSearchWord] = useState("");
  const [numOfPages, setNumOfPages] = useState(0);
  const { isLoading, books, totalCount, pageNumber } = useSelector((state) => state.books);
  const { filterObj, filter, filterLoading } = useSelector(
    (state) => state.booksFilter
  );
  const nBookPerPage = 12;
  const dispatch = useDispatch();
  // const [pageNumber, setPageNumber] = useState(1);

  const handlePageChange = (e, pageNumber) => {
    // setPageNumber(pageNumber);
    dispatch(setBooksPageNumber(pageNumber));
  };

  const deleteFilter = (e) => {
    const name = e.target.getAttribute("name");
    let value;
    if (name === 'category') {
      value = JSON.parse(e.target.getAttribute("value"));
    } else {
      value = e.target.getAttribute("value");
    }
    if (name === 'language' || name === 'published') {
      dispatch(handleFilterCheck(value));
    }
    if (name === 'format') {
      dispatch(handleFilterRadio(value));
    }
    handlePageChange(e, 1);
    dispatch(setFilterObj({ method: "delete", name, value }));
  };

  // get all books
  function getBooks() {
    dispatch(getAllBooks(pageNumber));
  }

  // filter books by search
  function getBooksBySearch(searchKeyword) {
    dispatch(getBooksByWord({ pageNumber, searchKeyword }));
    setSearchWord(searchKeyword);
  }

  // get filtered books
  function getFilteredBooks(filter) {
    setSearchWord("")
    dispatch(booksFilter({ pageNumber, filter }));
  }

  const show = Object.keys(filterObj).map((key) => filterObj[key].length !== 0);

  useEffect(() => {
    if (searchWord === "" && !show.includes(true)) {
      getBooks();
    } else if (show.includes(true)) {
      getFilteredBooks(filter)
    } else {
      getBooksBySearch(searchWord);
    }
  }, [pageNumber, searchWord]);

  useEffect(() => {
    setNumOfPages(Math.ceil(totalCount / nBookPerPage));
  }, [totalCount]);

  const url = `${baseUrl}book/?keyword=searchValue`;


  return (
    <>
      <div className="">
        <LiveSearch
          minCharToSearch="1"
          label="search books"
          url={url}
          keyword="searchValue"
          hasImage="true"
          onSubmit={getBooksBySearch}
          // pageNumber={setPageNumber}
          navParam="book"
        />
      </div>

      {show.includes(true) && (
        <div
          className={`d-flex flex-wrap gap-2 w-100 px-3 py-4 mt-4 ${styles.filterWrapper}`}
        >
          {Object.keys(filterObj).map((key, index) => (
            filterObj[key].map((ele, index) => (
              <div key={index} className={`p-2 rounded ${styles.filter}`}>
                {key}:&nbsp;
                {(key === 'category') ? ele.name : ((ele === "0-2000") ? 'Before 2000' : ele)}
                <i
                  className={`fa-regular fa-circle-xmark ms-2 ${styles.xmarkPointer}`}
                  value={(key === 'category') ? JSON.stringify(ele) : ele}
                  name={key}
                  onClick={(e) => {
                    deleteFilter(e);
                  }}
                ></i>
              </div>
            ))
          ))}
        </div>
      )}

      {(isLoading || filterLoading) ? (
        <Loading sectionName="AllBooks" />
      ) : (
        <div className="row justify-content-center align-items-center">
          {totalCount === 0 && !isLoading ? (
            <div className={styles.notFoundContainer}>
              <p>No Books Found</p>
            </div>
          ) : isLoading ? (
            <Loading />
          ) : books.length > 0 ? (
            books.map((book, index) => (
              <div
                key={index}
                className={`col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5 ${styles.bookCard}`}
              >
                <BookCard
                  book={book}
                  key={book.id}
                  slug={book.slug}
                  image={book.image}
                  category={book.category}
                  desc={book.desc}
                  name={book.name}
                  price={book?.price}
                  author={book.author}
                  rate={book.rating}
                  section="AllBooks"
                  id={book._id || book.id}
                />
              </div>
            ))
          ) : (
            ""
          )}
          {books && numOfPages > 1 ? (
            <div className="my-5 pt-5 d-flex justify-content-center">
              <Stack spacing={2}>
                <Pagination
                  count={numOfPages}
                  page={pageNumber}
                  size="large"
                  shape="rounded"
                  variant="outlined"
                  color="primary"
                  onChange={handlePageChange}
                />
              </Stack>
            </div>
          ) : (
            <div className="my-5 pt-5 d-flex justify-content-center"></div>
          )}
        </div>
      )}
    </>
  );
}

export default AllBook;
