import { Card, CardContent, Container } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Checkout.module.css";

import CartSummary from "../../Components/Checkout/CartSummary";
import Coupon from "../../Components/Checkout/Coupon";
import Loading from "./../../Components/ReusableComponents/Loading/Loading";
import { getCart } from "../../Redux/Slicies/cartAction";
import { baseUrl } from "../../util/util";
import axiosInstance from "../../axios/axios-instance";
import CheckoutError from "../../Components/Checkout/CheckoutError";

const Checkout = () => {
  const dispatch = useDispatch();
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  const getCartDetails = useCallback(async () => {
    const { payload } = await dispatch(getCart());
    if (payload.message === "success" && payload.cart.books.length) {
      setCart(payload.cart);
    }
    setIsLoading(false);
  }, [dispatch]);
  const sendCouponHandler = async (code) => {
    if (!code.length) return;
    try {
      const { data } = await axiosInstance.put(`${baseUrl}cart/coupon`,{code});
      console.log(data);
      // data.result.length && setOptions(data.result);
    } catch (error) {
      // for future planning if other components asked me for error type!
    }
  };
  useEffect(() => {
    getCartDetails();
  }, [getCartDetails]);

  return !user ? (
    <CheckoutError
      majorText="401"
      minorText="Unauthorized"
    />
  ) : isLoading ? (
    <Loading />
  ) : !cart ? (
    <CheckoutError
      majorText="Empty Cart"
      minorText="Add some books to your cart first"
    />
  ) : (
    <div className={styles["checkout-main-container"]}>
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
    </div>
  );
};

export default Checkout;
