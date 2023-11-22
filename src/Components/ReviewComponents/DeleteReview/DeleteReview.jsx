import React, { useEffect } from "react";
import style from './DeleteReview.module.css';
import { useDispatch, useSelector } from "react-redux";
import { allReview, deleteReview } from "../../../Redux/Slicies/reviewAction";


const DeleteReview = ({ id }) => {
    const { deleteReviews } = useSelector((state) => state.review);
    // console.log(deleteReviews);
    const dispatch = useDispatch();

    const getReviewId = async (ReviewId) => {
        await dispatch(deleteReview(ReviewId))
    }


    return (
        <>
            <button className={`btn ${style.deleteBtn}`} onClick={() => getReviewId(id)}>Delete</button>
        </>
    );
}

export default DeleteReview;