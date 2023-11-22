import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from './Review.module.css'
import Rating from "../../ReusableComponents/Rating/Rating";
import { allReview } from "../../../Redux/Slicies/reviewAction";
import DeleteReview from "../DeleteReview/DeleteReview";
import UpdateReview from '../UpdateReview/UpdateReview';


const Review = () => {
   const { bookReviews } = useSelector((state) => state.books);
   const { allReviews } = useSelector((state) => state.review);
  //  console.log(allReviews);
   const { user } = useSelector((state) => state.auth);
// console.log(user?.userName);
// console.log(bookReviews);



    return (
        <>
       
           {bookReviews.length === 0?"":
           <>
            <div className="container my-5">
                <div className={`row justify-content-center align-items-center ${style.paddingInline}`}>

                    <div className={`col-10 pt-4 ${style.reviewBg}`}>
   
                            {bookReviews?.map((review, index) =>
      
                                     <div className={`${style.reviewContent} position-relative mb-4`} key={review?._id}>
                                      <div className="d-flex align-items-center justify-content-between">
                                        
                                        <div className={`${style.quotes} position-absolute`}>
                                      <i className="fa-solid fa-quote-right"></i>

                                        </div>
                                      <div className="d-flex align-items-center">
                                        <i className={`fa-solid fa-circle-user me-2 ${style.fontname}`}></i>
                                        <span className={`${style.fontname} me-4`}>{review?.user?.userName}</span>
                                        </div>

                                        <Rating rate={review?.rating} />
                                      </div>
                                        <p className={`mt-3 ${style.fontParg} `}>❝ {review?.content} ❞</p>
                                        {review?.user?.userName === user?.userName? 
                                        <>
                                        <div className={`d-flex justify-content-end align-content-end flex-wrap`}>
                                     <UpdateReview id={review?._id} content={review?.content} rating={review?.rating}/>
                                       <span className={style.paddingSlash}>|</span>
                                     <DeleteReview id={review?._id}/>
                                        </div>
                                        </>
                                        :""}

                                    </div>
                                    
                        )}
             
                    </div>
                </div>
            </div>
           </>}
        </>
    );
}

export default Review;