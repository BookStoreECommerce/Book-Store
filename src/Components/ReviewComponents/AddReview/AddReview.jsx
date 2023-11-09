import React from "react";
import styles from './AddReview.module.css'
import profile from '../../../assets/profile.png'


const AddReview = () => {

    return (
        <>
        <div className={`${styles.review} mt-5 position-relative d-flex justify-content-center `}>
            <img src={profile} alt="" className={styles.reviewBg}/>
            <div className={`${styles.overlay}`}>
                <h4 className={styles.reviewTitle}>Review this product</h4>
                <p className={styles.lead}>Share your thoughts with other customers</p>
                <button className={`${styles.btn} btn`} >Write a customer review</button>
            </div>
         </div>
        </>
    );
}

export default AddReview;