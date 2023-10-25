import React from 'react'
import { addCart } from '../../Redux/Slicies/cartAction';
import { useDispatch } from 'react-redux';
import styles from "./AddCart.module.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function AddCart({ id }) {
  const dispatch = useDispatch();

  const addCartProduct = async () => {
    await dispatch(addCart({ book: id }));
    toast.success(`Book added to cart!`, {
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
      <span className={` ${styles.pointer}  text-decoration-none`} >
        <span className={styles.icon} onClick={() => addCartProduct()}>
          <i className="fa-solid fa-cart-shopping" ></i>
        </span>
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
      </span>
    </>
  )
}

export default AddCart
