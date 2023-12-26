import React from "react";
import style from './DeleteReview.module.css';
import { useDispatch } from "react-redux";
import { deleteReview } from "../../../Redux/Slicies/reviewAction";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const DeleteReview = ({ id }) => {

    const dispatch = useDispatch();
    const getReviewId = async (ReviewId) => {
        await dispatch(deleteReview(ReviewId))
        toast.error("Review deleted!", {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            closeButton: false
        });
    }
    
    return (
        <>
            <button className={`btn ${style.deleteBtn}`} onClick={() => getReviewId(id)}>Delete</button>
            <ToastContainer position="bottom-left"
                                                autoClose={2000}
                                                hideProgressBar={false}
                                                newestOnTop={false}
                                                closeOnClick={false}
                                                rtl={false}
                                                pauseOnFocusLoss
                                                closeButton={false}
                                                draggable
                                                pauseOnHover={false}
                                                theme="light" />
        </>
    );
}

export default DeleteReview;