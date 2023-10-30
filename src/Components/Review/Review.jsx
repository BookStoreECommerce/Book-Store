import React from "react";
import style from './Review.module.css'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllReviews } from "../../Redux/Slicies/reviewAction";



const Review = () => {

    const { allReviews } = useSelector((state) => state.review);
    console.log(allReviews);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllReviews())
    }, [])

    return (
        <>
        {allReviews?.map((review,index)=>
        <div className="col-12">
            <div className="d-flex">
                <div className="user">
     
                </div>
            </div>
        </div>
        )}
        </>
    );
}

export default Review;