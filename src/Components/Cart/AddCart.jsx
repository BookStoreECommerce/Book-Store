import React from 'react'
import { addCartWithOutToken, addCartWithToken } from '../../Redux/Slicies/cartAction';
import { useDispatch } from 'react-redux';
import styles from "./AddCart.module.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function AddCart({ id }) {
  const token = localStorage.getItem("access-token");
  const dispatch = useDispatch();
  let cart ;
  
  const cartDetails = {
    book: {id},
    price:0,
    qty:0,
    totalPrice:0,
  }


  const addCartProduct = async () => {

    if (token) {
      await dispatch(addCartWithToken({ book: id }));
    } else {
      // localStorage.removeItem("cartDetails")

      cart = JSON.parse(localStorage.getItem("cartDetails") || "[]");
      cart.push(cartDetails)
      localStorage.setItem("cartDetails", JSON.stringify(cart))
      // await dispatch(addCartWithOutToken({ book: id }));
      // console.log("ay 7aga");
    }

    toast.success(`Book added to cart!`, {
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
