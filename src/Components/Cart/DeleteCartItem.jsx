import React from 'react'
import { deleteCartItem } from '../../Redux/Slicies/cartAction';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import styles from "./DeleteCartItem.module.css";
import 'react-toastify/dist/ReactToastify.css';

function DeleteCartItem({ id }) {
  const dispatch = useDispatch();

  const removeCartItem = async () => {
    await dispatch(deleteCartItem({ book: id }));
    toast.error(`Book removed from cart!`, {
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

  return (
    <>
    <div>
    <div className={styles.deleteBook} onClick={() => removeCartItem()}>
    <i className={` ${styles.trashIcon} fa-regular fa-trash-can`}></i>
    </div>
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
    </div>
     
    </>
  )
}

export default DeleteCartItem
