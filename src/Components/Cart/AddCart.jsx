import React from 'react'
import { addCartWithToken } from '../../Redux/Slicies/cartAction';
import { useDispatch } from 'react-redux';
import styles from "./AddCart.module.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { setCartInLocalStorage } from '../../Redux/Slicies/cartSlice';

function AddCart({ id, book }) {
  const token = localStorage.getItem("access-token");
  const dispatch = useDispatch();

  let cart2;

  const cart = {
    books: [{
      book: {
        image: book?.image,
        // image: book?.image?.secure_url,
        _id: id,
        price: book?.price,
        name: book?.name,
        id: id
      },
      price: book?.price,
      qty: 1,
      totalPrice: book?.price,
    }],
    totalAmount: book?.price,
    totalAmountAfterDisc: book?.price,
    discount: 0
  }
  
  const addCartProduct = async () => {
    let flag = false;
    if (token) {
      await dispatch(addCartWithToken({ book: id }));

    } else {
      if (localStorage.getItem("cartDetails")) {
        cart2 = JSON.parse(localStorage.getItem("cartDetails") || "[]");
        if (cart2.books.length > 0) {
          cart2.books.map((el) => {
            if (el.book.id === id) {
              el.qty++
              el.totalPrice = el.qty * el.price
              flag = true;
            }
          })
          if (!flag) {
            cart2.books.push(cart.books[0])
          }
        }
        localStorage.setItem("cartDetails", JSON.stringify(cart2))
      } else {
        localStorage.setItem("cartDetails", JSON.stringify(cart))
      }
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
        <span className={`${styles.icon} `} onClick={() => addCartProduct()}>
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
