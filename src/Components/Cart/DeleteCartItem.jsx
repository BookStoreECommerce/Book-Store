import React from 'react'
import { deleteCartItem } from '../../Redux/Slicies/cartAction';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import styles from "./DeleteCartItem.module.css";
import 'react-toastify/dist/ReactToastify.css';
import { deletFromCart, setCartInLocalStorage } from '../../Redux/Slicies/cartSlice';

function DeleteCartItem({ id }) {
  // const { token } = useSelector((state) => state.auth);
  const token = localStorage.getItem("access-token");
  const dispatch = useDispatch();
  let cartArray = JSON.parse(localStorage.getItem('cartDetails'));
  const cart = JSON.parse(localStorage.getItem("cartDetails"))
  const removeCartItem = async (id) => {
    if (token == null) {
      cartArray = cartArray.filter((item) => item.book.id !== id)
      await dispatch(setCartInLocalStorage(cartArray));
    }
    else if (token) {
      if (cart) {
        cartArray = cartArray.filter((item) => item.book.id !== id)
        await dispatch(setCartInLocalStorage(cartArray));

      }
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
      closeButton: false
    });
  }
  return (
    <>
      <div>
        <div className={styles.deleteBook} onClick={() => dispatch(deletFromCart(id))}>
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
