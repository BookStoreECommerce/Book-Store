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
import { setFilterObj } from "../../Redux/Slicies/filterSlice";
function AllBook({ sectionName }) {
  useEffect(() => {
    AOS.init();
    window.addEventListener("load", AOS.refresh);
  }, []);

  const [searchWord, setSearchWord] = useState("");
  const [numOfPages, setNumOfPages] = useState(0);
  const { isLoading, books, totalCount } = useSelector((state) => state.books);
  // const { filterObj } = useSelector((state) => state.booksFilter);
  const { language , price } = useSelector((state) => state.booksFilter.filterObj);
  const nBookPerPage = 12;
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);

  const handleChange = (e, pageNumber) => {
    setPageNumber(pageNumber);
  };
  const deleteFilter = (e) => {
    const name = e.target.getAttribute('name');
    const value = e.target.getAttribute('value');
    dispatch(setFilterObj({method: "delete", name, value}));
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

  useEffect(() => {
    if (searchWord === "") {
      getBooks();
    } else {
      getBooksBySearch(searchWord);
    }
  }, [pageNumber]);

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
            pageNumber={setPageNumber}
            navParam="book"
          />
        </div>

        {/* needs to be modefied >>> global for all filters */}
        {language.length !== 0 && 
          <div
            className={`d-flex flex-wrap gap-2 w-100 px-3 py-4 ${styles.filterWrapper}`}
          >
            {language.map((lang, index) => (
                <div
                  key={index}
                  className={`p-2 rounded ${styles.filter}`}
                >
                  {lang}
                  <i
                    className={`fa-regular fa-circle-xmark ms-2 ${styles.xmarkPointer}`}
                    value= {lang}
                    name= "language"
                    onClick={(e) => {
                      deleteFilter(e);
                    }}
                  ></i>
                </div>
              ))}
          </div>}

        {isLoading ? (
          <Loading sectionName="AllBooks" />
        ) : (
          <div className="row">
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
                  className={` col-lg-3 col-sm-6 col-12 mb-5 ${styles.bookCard}`}
                >
                  <BookCard
                    key={book.id}
                    slug={book.slug}
                    image={book.image.secure_url}
                    category={book.category}
                    desc={book.desc}
                    name={book.name}
                    price={book?.price}
                    author={book.author}
                    rate={book.rate}
                    section={sectionName}
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
                    onChange={handleChange}
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
