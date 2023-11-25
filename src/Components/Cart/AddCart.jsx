import React from "react";
import { useDispatch } from "react-redux";
import styles from "./AddCart.module.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { addBookForBuy } from "../../Redux/Slicies/cartSlice";
import { handleClickOpen } from "../../Redux/Slicies/dialogSlice.js";

function AddCart({ id, book, component, children }) {
  const token = localStorage.getItem("access-token");
  const dispatch = useDispatch();


  const addToCartFnc = async () => {
    dispatch(addBookForBuy(book))
    dispatch(handleClickOpen({ name: "add-to-cart" }));
    if (!token) {
      // toast.dismiss(id);
    } else {
      // await dispatch(addCartWithToken({ book: id }));
      // toast.dismiss(id);
    }
  };

  return (
    <>
      <span className={` ${styles.pointer}  text-decoration-none`}>
        <span 
        className={component === "wishList" ? ` ${styles.longIcon}`: `${styles.icon}`}
        onClick={() => addToCartFnc()}>
          <i className="fa-solid fa-cart-shopping"></i>&nbsp;
          {children}
        </span>
        
      </span>
    </>
  );
}

export default AddCart;
