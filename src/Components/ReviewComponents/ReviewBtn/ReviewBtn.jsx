import React from "react";
import styles from './ReviewBtn.module.css'
import { handleReviewOpen } from "../../../Redux/Slicies/dialogSlice";
import { useDispatch, useSelector } from "react-redux";


const ReviewBtn = ({review}) => {
    const { user } = useSelector((state) => state.auth);
    var arr = review?.filter((ele)=>ele?.user?.userName === user?.userName )
     const dispatch = useDispatch();
    return ( 
        <>
                <button disabled={arr?.length != 0 ? true:false} className={`${styles.btn} btn`} onClick={()=>dispatch(handleReviewOpen())}>Write a customer review</button>
        
        </>
     );
}
 
export default ReviewBtn;