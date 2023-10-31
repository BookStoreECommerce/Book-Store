import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllReviews } from "../../Redux/Slicies/reviewAction";
import style from './Review.module.css'
import Rating from "../ReusableComponents/Rating/Rating";


const Review = ({id}) => {
   const { allReviews } = useSelector((state) => state.review);
   const arr = allReviews.filter((ele)=>ele.book === id)
   const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllReviews())
    }, [])

    return (
        <>
           {arr.length === 0?"":
           <>
            <div className="container my-5">
                <div className={`row justify-content-center align-items-center ${style.paddingInline}`}>

                    <div className={`col-12 py-5 ${style.reviewBg}`}>
   
                            {arr?.map((review, index) =>
            
                                     <div className={style.reviewContent} key={review?._id}>
                                        <div className="d-flex align-items-center">
                                        <i className={`fa-solid fa-circle-user me-2 ${style.fontname}`}></i>
                                        <span className={`${style.fontname}`}>{review.user.userName}</span>
                                        </div>

                                        <Rating rate={review.rating} />
                                        <p className={`mb-3 ${style.fontParg}`}>❝ {review.content} ❞</p>
                                        <hr/>
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