import React from 'react'
import { addCartWithOutToken, addCartWithToken, setCartInLocalStorage } from '../../Redux/Slicies/cartAction';
import { useDispatch } from 'react-redux';
import styles from "./AddCart.module.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function AddCart({ id, book }) {
  const token = localStorage.getItem("access-token");
  const dispatch = useDispatch();
  console.log("book",book);
  console.log("id",id);
  let cart;
  const cartDetails = {
    book: { id: book._id },
    name:book.name,
    image:book.image,
    author:book.author,
    price: book.price,
    qty: 1,
    totalPrice: book.price,
  }
  // console.log(book);

  const addCartProduct = async () => {


    if (token) {
      await dispatch(addCartWithToken({ book: id }));
    } else {
      // localStorage.removeItem("cartDetails")
      cart = JSON.parse(localStorage.getItem("cartDetails") || "[]");
      if (cart.length > 0) {
        cart.map((el) => {

          if (el.book.id === id) {
            console.log("yesssss");
            cart = cart.filter((car) => car.book.id !== id)
            cartDetails.qty++
            cartDetails.totalPrice = cartDetails.qty * cartDetails.price
          }
        })
      }
      cart.push(cartDetails)
      // localStorage.setItem("cartDetails", JSON.stringify(cart))
      dispatch(setCartInLocalStorage(cart));
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
