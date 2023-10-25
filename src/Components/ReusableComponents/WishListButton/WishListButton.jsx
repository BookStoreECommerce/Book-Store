import React, { useEffect, useState } from "react";
import { handleClickOpen } from "../../../Redux/Slicies/dialogSlice";
import { getWhishList } from "../../../Redux/Slicies/whishlistActions";
import { getUserProfile } from "../../../Redux/Slicies/authActions";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import styles from './WishListButton.module.css'

const WishListButton = ({bookId,section}) => {
    const [filled, setFilled] = useState(false)
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();


    const WhishList = async (bookId) => {
        await dispatch(getWhishList(bookId))
        await dispatch(getUserProfile())
    
        let arr = JSON.parse(localStorage.getItem('whishList'))
        if (arr.includes(bookId)) {
          setFilled(true)
          toast.success(`Add To WishList!`, {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            closeButton:false
          });
        } else {
          setFilled(false)
          toast.error("Remove from wishlist!", {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            closeButton:false
          });
        }
      }
      
        useEffect(() => {
    let arr = JSON.parse(localStorage.getItem('whishList'))
    if (arr?.includes(bookId)) {
      setFilled(true)
    } else {
      setFilled(false)
    }
  }, [filled])
  const token = localStorage.getItem('access-token');

    return ( 

        <>
        {user !== null && token !== null ? <>
                  <button className={`text-decoration-none btn ms-auto ${styles.btn}` }onClick={() => WhishList(bookId)}>

                    <span className={section==="profile"? styles.whishlisticonProfile:styles.whishlisticon}>
                      <i className={filled ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                    </span>
               
                  </button>
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
                </> :
                  <>
                    <button className={`text-decoration-none btn ms-auto ${styles.btn}`} onClick={() => {
                      dispatch(handleClickOpen({ name: "login" }));
                    }}>
                      <span className={styles.whishlisticon}>
                        <i className="fa-regular fa-heart"></i>
                      </span>
                    </button>
                  </>}
        </>
     );
}
 
export default WishListButton;