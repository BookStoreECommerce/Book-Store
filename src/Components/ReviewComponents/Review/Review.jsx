import React from "react";
import { useSelector } from "react-redux";
import style from './Review.module.css'
import Rating from "../../ReusableComponents/Rating/Rating";


const Review = ({id}) => {
   const { bookReviews } = useSelector((state) => state.books);
console.log(bookReviews);

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
                                        <span className={`${style.fontname} me-4`}>{review.user.userName}</span>
                                        </div>

                                        <Rating rate={review.rating} />
                                      </div>
                                        <p className={`mt-3 ${style.fontParg} `}>❝ {review.content} ❞</p>
                              
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