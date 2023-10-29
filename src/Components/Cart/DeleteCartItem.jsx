import React from 'react'
import { deleteCartItem, setCartInLocalStorage } from '../../Redux/Slicies/cartAction';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import styles from "./DeleteCartItem.module.css";
import 'react-toastify/dist/ReactToastify.css';

function DeleteCartItem({ id }) {
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let  cartArray = JSON.parse(localStorage.getItem('cartDetails'));

  const removeCartItem = async (id) => {
    console.log(id);
    if(token == null){
      console.log(cartArray);
      cartArray = cartArray.filter((item)=>item.book.id !== id)
      console.log(cartArray);
      await dispatch(setCartInLocalStorage(cartArray));
    }
    else if(token){
      await dispatch(deleteCartItem({ book: id }));

    }
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
    <div className={styles.deleteBook} onClick={() => removeCartItem(id)}>
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
