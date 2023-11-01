import React, { useEffect, useState } from "react";
import styles from "./BookProfile.module.css"
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBookBySlug } from "../../Redux/Slicies/bookActions.js";
import Loading from "../ReusableComponents/Loading/Loading.jsx";
import { Box } from "@mui/material";
import ScrollToTop from "../ReusableComponents/ScrollToTop/ScrollToTop.jsx";
import MainSlider from "../ReusableComponents/MainSlider/MainSlider.jsx";
import { removeFooterMargin, setFooterMargin } from "../../Redux/Slicies/appSlice";
import AddCart from "../Cart/AddCart";
// import ReactImageMagnify from 'react-image-magnify';

export default function BookProfile() {
  // const [book, setBook] = useState(null)
  const [showMore, setShowMore] = useState(false)
  const { slug } = useParams()
  const dispatch = useDispatch()
  const { isLoading, bookCategory, specBook } = useSelector(({ books }) => books)
  const { footerH, navH } = useSelector((state) => state.app);

  const getBookData = async () => {
    if (slug) {
      dispatch(getBookBySlug(slug))
    }
  }
  useEffect(() => {
    getBookData()
  }, [slug])

  useEffect(() => {
    dispatch(removeFooterMargin());
    return () => dispatch(setFooterMargin());
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />
      <Box className={styles.book_profile} sx={{
        marginTop: `${navH}px`,
        minHeight: `calc(100vh - ${footerH + navH}px)`,
      }}>
        {isLoading ? <Loading sectionName='profile' /> :
          <>
            <div className="container py-5">
              <div className="row mt-lg-5 mt-0 ">
                <div className="col-lg-3 col-md-6 col-8 position-relative">
                  <div className={`${styles.hide} d-flex justify-content-center align-items-center flex-column`}>

                  </div>
                  <div className={styles.show}>
                    <img src={specBook?.image?.secure_url} className="w-100" alt="" />
                  </div>

                </div>
                <div className=" col-lg-9 col-md-12 mt-3 mt-md-0">
                  <h2 className={styles.bookAuthor}>{specBook?.author} </h2>
                  <h2 className={styles.bookName}>{specBook?.name} </h2>
                  <h3 className={styles.category}>{specBook?.category?.name}</h3>
                  <p className={styles.description}>
                    {specBook?.desc.length > 250 ? <>
                      {showMore ? specBook?.desc : `${specBook?.desc.substring(0, 250)}`}
                      <button className={`btn ${styles.btnSeeMore} ms-2`} onClick={() => setShowMore(!showMore)}>{showMore ? "Read less" : "Read more"}</button>
                    </> : specBook?.desc}
                  </p>
                  <div>
                    <p className={styles.textColorDetails}><span className={styles.textColor}>Publisher:</span> {specBook?.publisher} ({specBook?.published})</p>
                    <p className={styles.textColorDetails}><span className={styles.textColor}>Price:</span> {specBook?.price} EGP</p>
                    <p className={styles.textColorDetails}><span className={styles.textColor}>Language:</span> {specBook?.lang}</p>
                    <p className={styles.textColorDetails}><span className={styles.textColor}>Paperback:</span> {specBook?.pages}</p>
                    <p className={styles.textColorDetails}><span className={styles.textColor}>ISBN:</span> {specBook?.ISBN}</p>
                  </div>
                  <div className={styles.addToCartSection}>
                  <div className={styles.addToCartBtn}>
                  <AddCart id={specBook?._id} />
                  </div>
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
