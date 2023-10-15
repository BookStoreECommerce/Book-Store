import logo from "./Book1.png";

import React, { useEffect, useState } from "react";
import styles from "./BookProfile.module.css"
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBookBySlug } from "../../Redux/Slicies/bookActions.js";
import Loading from "../ReusableComponents/Loading/Loading.jsx";
import { Box } from "@mui/material";
import BestSeller from "../HomeComponents/BestSeller/BestSeller.jsx";
import SliderScrollBtn from "../ReusableComponents/SliderScrollBtn/SliderScrollBtn.jsx";
import ScrollToTop from "../ReusableComponents/ScrollToTop/ScrollToTop.jsx";
import Slider from "../HomeComponents/Slider/Slider.jsx";
import MainSlider from "../ReusableComponents/MainSlider/MainSlider.jsx";
import { removeFooterMargin, setFooterMargin } from "../../Redux/Slicies/appSlice";
export default function BookProfile() {
  const [book, setBook] = useState(null)
  const [showMore, setShowMore] = useState(false)
  const {slug} = useParams()
  const dispatch = useDispatch()
  const {isLoading, bookCategory, specBook} = useSelector(({books})=>books)
  const { footerH, navH } = useSelector((state) => state.app);

  const getBookData = async ()=>{
    if(slug){
      dispatch(getBookBySlug(slug))
    }
  }
  useEffect(()=>{
    getBookData()
  }, [slug])

  useEffect(() => {
    dispatch(removeFooterMargin());
    return () => dispatch(setFooterMargin());
}, [dispatch]);

  return (
    <>
    <Box className={styles.book_profile} sx={{
        marginTop: `${navH}px`,
        minHeight: `calc(100vh - ${footerH + navH}px)`,
      }}>
        {isLoading ? <Loading/> : 
        <>
        <div className="container py-5">
          <div className="row">
            <div className="col-md-4 position-relative">
              <img src={specBook?.image?.secure_url} alt="" className="w-100" />
            </div>
            <div className="col-md-8">
              <h2 className={styles.bookAuthor}>{specBook?.author} </h2>
              <h2 className={styles.bookName}>{specBook?.name} </h2>
              <h3 className={styles.category}>{specBook?.category?.name}</h3>
                <p className={styles.description}>
                
                  {showMore? specBook?.desc : `${specBook?.desc.substring(0,400)}`}
                  <button className={`btn ${styles.btnSeeMore}`} onClick={()=>setShowMore(!showMore)}>{showMore?"show less":"show more"}</button>
                </p>
                <div className={`d-flex flex-wrap mt-5 ${styles.gap} `}>
                  <span className="badge px-3 py-2 text-light">Price: {specBook?.price} EGP</span>
                  <span className="badge px-3 py-2 text-light">Publisher: {specBook?.publisher}</span>
                  <span className="badge px-3 py-2 text-light">Published At: {specBook?.published}</span>
                  <span className="badge px-3 py-2 text-light">pages: {specBook?.pages}</span>
                </div>
            </div>
          </div>
        </div>
        <MainSlider autoplay={false} arr={bookCategory} title="Suggested for you" />
      </>
    }
    </Box>
    </>
  );
}
