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
import WishListButton from "../ReusableComponents/WishListButton/WishListButton";
import Review from "../ReviewComponents/Review/Review";
import Rating from "../ReusableComponents/Rating/Rating";
import AddCart from "../Cart/AddCart";
import AddReview from "../ReviewComponents/AddReview/AddReview";
import ReviewDialog from "../Dialogs/ReviewDialog/ReviewDialog.jsx";
import AddToCartFromProfile from "./AddToCartFromProfile.jsx";

export default function BookProfile() {
  const [showMore, setShowMore] = useState(false)
  const { slug } = useParams()
  const dispatch = useDispatch()
  const { isLoading, bookCategory, specBook } = useSelector(({ books }) => books)
  const { footerH, navH } = useSelector((state) => state.app);
  const { loading,addReviews } = useSelector((state) => state.review);

  const { user } = useSelector((state) => state.auth);
  const userName = user.userName
  const getBookData = async () => {
    if (slug) {
      dispatch(getBookBySlug(slug))

    }
  }
// console.log(specBook);
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
              <div className="row mt-lg-5 mt-0 justify-content-center">
                <div className="col-lg-3 col-md-6 col-8 position-relative">
                  <div>
                    <img src={specBook?.image?.secure_url} className="w-100" alt="" />
                  </div>

                </div>
                <div className=" col-lg-9 col-md-12 mt-3 mt-md-0">
                  <div className={styles.textright}>
                    <WishListButton bookId={specBook?._id} section="profile" />
                  </div>
                  <h2 className={styles.bookAuthor}>{specBook?.author} </h2>
                  <h2 className={styles.bookName}>{specBook?.name} </h2>
                  <span className={styles.rate}><Rating rate={specBook?.rating} section="profile" /><span className={`ms-2 ${styles.rateColor}`}>{specBook?.rating} {specBook?.rating?"out of 5":""}</span></span>
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
                    <div className={`${styles.addToCartBtn} w-100`}>
                      <AddToCartFromProfile book={specBook}/>
                      {/* <AddCart id={specBook?._id} book={specBook} /> */}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <MainSlider autoplay={false} arr={bookCategory} title="Suggested for you" />
            {/* <AddReview review={specBook?.reviews}/> */}
            {loading ?<i className={`fas fa-spinner fa-spin ${styles.spinnerColor}`}></i>:<Review id={specBook?._id} />}
          
            <ReviewDialog id={specBook?._id} review={specBook?.reviews} />

          </>
        }
      </Box>
    </>
  );
}
