import { Card, CardContent, Container } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./Checkout.module.css";

import CartSummary from "../../Components/Checkout/CartSummary";
import Coupon from "../../Components/Checkout/Coupon";
import Loading from "./../../Components/ReusableComponents/Loading/Loading";
import { getCart } from "../../Redux/Slicies/cartAction";
import { baseUrl } from "../../util/util";
import axiosInstance from "../../axios/axios-instance";

const Checkout = () => {
  const dispatch = useDispatch();
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  const getCartDetails = useCallback(async () => {
    if (user) {
      const { payload } = await dispatch(getCart());
      if (payload.message === "success" && payload.cart.books.length) {
        setCart(payload.cart);
        setIsLoading(false);
      }
    } else {
      // getting cart from localStorage!
      setCart({
        books: [
          { _id: 1, book: { name: "book1" }, qty: 1, price: 10 },
          { _id: 2, book: { name: "book2" }, qty: 2, price: 15 },
        ],
        totalAmount: 40,
      });
      setIsLoading(false);
    }
  }, [dispatch, user]);
  const sendCouponHandler = async (code) => {
    try {
      // const { data } = await axiosInstance(`${baseUrl}book/?keyword=b`);
      // console.log(data);
      // data.result.length && setOptions(data.result);
    } catch (error) {
      // for future planning if other components asked me for error type!
    }
  };
  useEffect(() => {
    getCartDetails();
  }, [getCartDetails]);

  return (
    <div className={styles["checkout-main-container"]}>
      {isLoading ? (
        <Loading />
      ) : !cart ? (
        <>
          <h1>Empty Cart</h1>
          <Link to="/">Back Home</Link>
        </>
      ) : (
        <div className={styles["checkout-container"]}>
          <Container className={styles["sidebar"]}>
            <Card>
              <CardContent className="d-grid gap-5">
                <CartSummary cart={cart} />
                <Coupon onSendCoupon={sendCouponHandler} />
              </CardContent>
            </Card>
          </Container>
          <Container className={styles["checkout-content"]}>checkout</Container>
        </div>
      )}
    </div>
  );
};

export default Checkout;
