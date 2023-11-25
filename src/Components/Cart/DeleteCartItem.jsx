import React from "react";
import { deleteCartItem } from "../../Redux/Slicies/cartAction";
import { useDispatch } from "react-redux";
import styles from "./DeleteCartItem.module.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import {
  deletFromCart,
} from "../../Redux/Slicies/cartSlice";

function DeleteCartItem({ id, variation_name }) {
  // const { token } = useSelector((state) => state.auth);
  const token = localStorage.getItem("access-token");
  const dispatch = useDispatch();

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
    if (token) {
    await dispatch(deleteCartItem({ book: id, variation_name }));
    toast.dismiss(id);
    } else {
    await dispatch(deletFromCart({ id, variation_name }));
    toast.dismiss(id);

    }

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
