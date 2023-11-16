import React from "react";
import { deleteCartItem } from "../../Redux/Slicies/cartAction";
import { useDispatch, useSelector } from "react-redux";
import styles from "./DeleteCartItem.module.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import {
  deletFromCart,
  setCartInLocalStorage,
} from "../../Redux/Slicies/cartSlice";

function DeleteCartItem({ id, type }) {
  // const { token } = useSelector((state) => state.auth);
  const token = localStorage.getItem("access-token");
  const dispatch = useDispatch();
  const cart = JSON.parse(localStorage.getItem("cartDetails"));
  const removeAlert = () => {
    toast.error(`Book removed from cart!`, {
      position: "bottom-left",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
      closeButton: false,
    });
  };
  const removeCartItem = async () => {
    toast.loading(`Deleting Book .........`, {
      position: "bottom-left",
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: 0,
      theme: "colored",
      closeButton: false,
      toastId: id,
    });
    // if (token) {
      // await dispatch(deleteCartItem({ book: id }));
      // toast.dismiss(id);

    //   removeAlert();
    // } else {
      await dispatch(deletFromCart({id, type}));
      toast.dismiss(id);

      removeAlert();
    // }
  };

  return (
    <>
      <div>
        <div className={styles.deleteBook} onClick={removeCartItem}>
          <i className={` ${styles.trashIcon} fa-regular fa-trash-can`}></i>
        </div>
        <ToastContainer
          position="bottom-left"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          closeButton={false}
          draggable
          pauseOnHover={false}
          theme="light"
        />
      </div>
    </>
  );
}

export default DeleteCartItem;
