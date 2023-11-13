import React from "react";
import { addCartWithToken } from "../../Redux/Slicies/cartAction";
import { useDispatch } from "react-redux";
import styles from "./AddCart.module.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { addToCart } from "../../Redux/Slicies/cartSlice";

function AddCart({ id, book, component, children }) {
  const token = localStorage.getItem("access-token");
  const dispatch = useDispatch();

  const addAlert = () => {
    console.log(111);
    toast.success(
      `${book.name.split(" ").slice(0, 3).join(" ")} added to cart!`,
      {
        position: "bottom-left",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        closeButton: false,
      }
    );
  };

  const addToCartFnc = async () => {
    toast.loading(`Adding ${book.name.split(" ").slice(0, 3).join(" ")}.....`, {
      position: "bottom-left",
      autoClose: 3000,

      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: 0,
      theme: "colored",
      closeButton: false,
      toastId: id,
    });
    if (!token) {
      await dispatch(addToCart(book));
      toast.dismiss(id);
      addAlert();
    } else {
      await dispatch(addCartWithToken({ book: id }));
      toast.dismiss(id);
      addAlert();
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
      </span>
    </>
  );
}

export default AddCart;
