import React from "react";
import { addCartWithToken } from "../../Redux/Slicies/cartAction";
import { useDispatch, useSelector } from "react-redux";
import styles from "./AddCart.module.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import {
  addToCart,
  setCartInLocalStorage,
} from "../../Redux/Slicies/cartSlice";

function AddCart({ id, book }) {
  const token = localStorage.getItem("access-token");
  const dispatch = useDispatch();
  const { localStorageCart } = useSelector(({ cart }) => cart);
  let cart2;
  const cart = {
    books: [
      {
        book: {
          image: book?.image,
          _id: id,
          price: book?.price,
          name: book?.name,
          id: id,
        },
        price: book?.price,
        qty: 1,
        totalPrice: book?.price,
      },
    ],
    totalAmount: 0,
    totalAmountAfterDisc: 0,
    discount: 0,
  };

  // const addCartProduct = async () => {
  //   let flag = false;
  //   if (token) {
  //     await dispatch(addCartWithToken({ book: id }));
  //   } else {
  //     if (localStorage.getItem("cartDetails")) {
  //       cart2 = JSON.parse(localStorage.getItem("cartDetails") || "[]");
  //       if (cart2.books.length > 0) {
  //         cart2.books.map((el) => {
  //           if (el.book.id === id) {
  //             el.qty++
  //             el.totalPrice = el.qty * el.price
  //             flag = true;
  //           }
  //         })
  //         if (!flag) {
  //           cart2.books.push(cart.books[0])
  //         }
  //       }
  //       // localStorage.setItem("cartDetails", JSON.stringify(cart2))
  //       dispatch(setCartInLocalStorage(cart2));
  //     } else {
  //       // localStorage.setItem("cartDetails", JSON.stringify(cart))
  //       dispatch(setCartInLocalStorage(cart));

  //     }
  //   }

  //   toast.success(`Book added to cart!`, {
  //     position: "bottom-left",
  //     autoClose: 2000,
  //     hideProgressBar: false,
  //     closeOnClick: false,
  //     pauseOnHover: false,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "colored",
  //     closeButton: false
  //   });
  // }

  const addAlert = () => {
    console.log(111);
    toast.success(`Book added to cart!`, {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
      closeButton: false,
    });
  };

  const addToCartFnc = async () => {
    if (!token) {
      await dispatch(addToCart(book));
      addAlert();
    } else {
      await dispatch(addCartWithToken({ book: id }));
      addAlert();
    }
  };

  return (
    <>
      <span className={` ${styles.pointer}  text-decoration-none`}>
        <span className={`${styles.icon} `} onClick={() => addToCartFnc()}>
          <i className="fa-solid fa-cart-shopping"></i>
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
