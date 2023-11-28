import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScrollToTop from "../ReusableComponents/ScrollToTop/ScrollToTop";
import { Box, Input } from "@mui/material";
import { Link } from "react-router-dom";
import Loading from "../ReusableComponents/Loading/Loading";
import ClearCart from "./ClearCart";
import DeleteCartItem from "./DeleteCartItem";
import { createCart, getCart } from "../../Redux/Slicies/cartAction";
import { Button } from "@mui/material";
import styles from "./Cart.module.css";
import {
  decreaseCartQty,
  getCartWithoutToken,
  increaseCartQty,
} from "../../Redux/Slicies/cartSlice";
import UpdataCart from "./UpdataCart.jsx";

export default function Cart() {
  const dispatch = useDispatch();

  const { footerH, navH } = useSelector((state) => state.app);
  const token = localStorage.getItem("access-token");
  const {
    isLoading,
    localStorageCart,
    totalAmountAfterDisc,
    totalAmount,
    discount,
  } = useSelector((state) => state.cart);
  // const { token } = useSelector((state) => state.auth);
  const getCartDetails = () => {
    token ? dispatch(getCart()) : dispatch(getCartWithoutToken());
  };

  const updateCart = () => {
    setTimeout(() => {
      dispatch(createCart(localStorageCart));
    }, 3000);
  };

  useEffect(() => {
    getCartDetails();
  }, [dispatch]);
  console.log(discount);
  return (
    <>
      <ScrollToTop />
      <Box
        sx={{
          marginTop: `${navH}px`,
          minHeight: `calc(100vh - ${footerH + navH}px)`,
        }}
        className={styles.flex}
      >
        <div className={styles.badge}>
          <span className={styles.slug}>Shopping Cart</span>
          <div className={styles.content}>
            <Link to="/">
              {" "}
              <i className="fa-solid fa-home"></i>{" "}
            </Link>
            <span className={styles.slash}>
              {" "}
              / <Link to="/cart">Your Cart</Link>{" "}
            </span>
          </div>
        </div>
        <div className="container  pt-5 mt-5">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <div className="row justify-content-center pb-2">
                {localStorageCart?.books?.length >= 0 ? (
                  <>
            {localStorageCart?.books?.length > 0 ?         <div className="col-lg-4 col-md-12 col-12">
         {!discount ? (
                      <div className={styles.checkoutStyles}>
                        <h1 className={styles.totalAmount}>Total cart Amount: <span className={styles.totalAmountSpan}>{totalAmount}</span></h1>
                        <h1 className={styles.totalAmount}>Discount: <span className={styles.totalAmountSpan}>{discount}</span></h1>
                        <h1 className={styles.totalAmount}>
                          Total Amount After Discount: <span className={styles.totalAmountSpan}>{totalAmountAfterDisc}</span>
                        </h1>
                      </div>
                    ) : (
                      <h1>Total cart Amount: {totalAmount}</h1>
                    )}
                            {localStorageCart?.books?.length > 0 ? (
                      <div className={styles.checkoutBtn}>
                        <Button
                          variant="outlined"
                          component={Link}
                   
                          to="/checkout"
                          endIcon={
                            isLoading ? (
                              <i className="fas fa-spinner fa-spin"></i>
                            ) : (
                              <i className="fa-solid"></i>
                            )
                          }
                          className={`mainBtn ${styles.fitContent}`}
                        >
                          Checkout {totalAmountAfterDisc}
                        </Button>
                      </div>
                    ) : (
                      ""
                    )}
         </div>:""}


                <div className="col-lg-8 col-md-12 col-12">
                {localStorageCart?.books.map((book, index) => (
                      <div
                        className={`${styles.orderCard} col-lg-12 col-md-12 col-sm-12 col-12`}
                        key={index}
                      >
                        <div
                          className={`row justify-content-between ${styles.cardParent}`}
                        >
                          <div className="col-md-11">
                            <div className="row">
                              <div className="col-sm-3 col-4">
                                <Link to={`/book/${book.book.slug}`}>
                                  <div className={styles.bookCoverWrapper}>
                                    <img
                                      src={
                                        book.book.image?.secure_url ||
                                        book.book.image
                                      }
                                      alt="Book Cover"
                                    />
                                  </div>
                                </Link>
                              </div>
                              <div
                                className={`${styles.bookDetails} col-sm-9 col-8 ps-0`}
                              >
                                <div className={styles.titleAndPrice}>
                                  <div className={styles.bookTitle}>
                                    {book.book.name}
                                  </div>
                                </div>
                                <div className={styles.titleAndPrice}>
                                  <div className={styles.bookTitle}>
                                    {book.variation_name}
                                  </div>
                                </div>

                                <div className={styles.bookPrice}>
                                  {book.price} EGP
                                </div>
                                {book.variation_name === "hardcover" && (
                                  <UpdataCart book={book} index={index} />
                                )}
                              </div>
                            </div>
                          </div>
                          <div className={` ${styles.deleteAndSubTotal}  `}>
                            <DeleteCartItem
                              id={book?.book._id}
                              variation_name={book?.variation_name}
                            />
                          </div>
                          <div className={styles.bookSubTotal}>
                            {book.price * book.qty} EGP
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                    {localStorageCart?.books?.length > 0 ? (
                      <ClearCart />
                    ) : (
                      <div className={styles.notFoundContainer}>
                        <div className={styles.notFoundContainer}>
                          <p>No Items Found In Cart</p>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className={styles.notFoundContainer}>
                    <div className={styles.notFoundContainer}>
                      <p>No Items Found In Cart</p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </Box>
    </>
  );
}
