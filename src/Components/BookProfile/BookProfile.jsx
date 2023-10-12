import logo from "./Book1.png";

import React, { useEffect, useState } from "react";
import styles from "./BookProfile.module.css"
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBookBySlug } from "../../Redux/Slicies/bookActions.js";
import Loading from "../ReusableComponents/Loading/Loading.jsx";
import { Box } from "@mui/material";
export default function BookProfile() {
  const [book, setBook] = useState(null)
  const {slug} = useParams()
  const dispatch = useDispatch()
  const {isLoading, bookCategory, specBook} = useSelector(({books})=>books)
  const { footerH, navH } = useSelector((state) => state.app);
  console.log({isLoading, bookCategory, specBook});

  const getBookData = async ()=>{
    if(slug){
      dispatch(getBookBySlug(slug))
    }
  }
  useEffect(()=>{
    getBookData()
  }, [])
  return (
    <>
      {isLoading ? <Loading /> : <Box className={styles.book_profile} sx={{
        marginTop: `${navH}px`,
        minHeight: `calc(100vh - ${footerH + navH}px)`,
      }}>
      <div className="container py-5">
        <div className="row">
          {/* <div className="col-md-1">
            <img src={logo} alt="" className="w-100 mb-3" />
            <img src={logo} alt="" className="w-100 mb-3" />
            <img src={logo} alt="" className="w-100 mb-3" />
            <img src={logo} alt="" className="w-100 mb-3" />
          </div> */}
          <div className="col-md-4 position-relative">
            <h5 className=" position-absolute end-0 opacity-50"><span className="badge bg-secondary py-3 text-light">Discount<br/> 55$</span></h5>
            <img src={specBook?.image?.secure_url} alt="" className="w-100" />
          </div>
          <div className="col-md-8">
            <h2>Book Name:{specBook?.name} </h2>
            <h2>Author:{specBook?.author} </h2>
            <h3>Category:{specBook?.category?.name}</h3>
            <h3>Price: {specBook.price}</h3>
            <h3>About Book:</h3>
              <p>
                {specBook?.desc}
              </p>
              <p>
                <span className="badge bg-secondary px-3 py-2 me-2 text-light">Price: {specBook.price}</span>
                <span className="badge bg-secondary px-3 py-2 mx-2 text-light">Publisher: {specBook?.publisher}</span>
                <span className="badge bg-secondary px-3 py-2 mx-2 text-light">Published At: {specBook?.published}</span>
                <span className="badge bg-secondary px-3 py-2 mx-2 text-light">pages: {specBook?.pages}</span>
              </p>
          </div>
        </div>
      </div>
    </Box>}
    </>
  );
}
