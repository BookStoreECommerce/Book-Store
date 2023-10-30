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
  const cart1 = useSelector((state) => state.cart);
  // console.log(cartBooks);

  console.log("out: ", cart1);
  const getCartDetails = useCallback(
    async (cart) => {
      const { payload } = await dispatch(getCart());
      // console.log('payload: ', payload.cart);
      console.log("in: ", cart1);
      if (payload.message === "success" && payload.cart.books.length) {
        cart ? setCart(cart) : setCart(payload.cart);
        console.log("hena");
      }
      setIsLoading(false);
    },
    [dispatch]
  );

  useEffect(() => {
    if (cart1?.cartBooks?.length > 0) getCartDetails(cart1);
  }, [getCartDetails, cart1]);

  return !user ? (
    <CheckoutError majorText="401" minorText="Unauthorized" />
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
              <Coupon onCouponChange={getCartDetails} code={cart.coupun_code} />
            </CardContent>
          </Card>
        </Container>
        <Container className={styles["checkout-content"]}>checkout</Container>
      </div>
    </div>
  );
};

export default Checkout;
