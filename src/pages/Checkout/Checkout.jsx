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
  const { user } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  console.log("cart: ", cart);
  // console.log("user: ", user);

  return !user ? (
    <CheckoutError majorText="401" minorText="Unauthorized" />
  ) : cart.isLoading ? (
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
              <Coupon code={cart.coupon_code} />
            </CardContent>
          </Card>
        </Container>
        <Container className={styles["checkout-content"]}>checkout</Container>
      </div>
    </div>
  );
};

export default Checkout;
