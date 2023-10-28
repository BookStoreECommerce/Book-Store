import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./Checkout.module.css";

import CartSummary from "../../Components/Checkout/CartSummary";
import Coupon from "../../Components/Checkout/Coupon";
import Loading from "./../../Components/ReusableComponents/Loading/Loading";
import { getCart } from "../../Redux/Slicies/cartAction";
import { Card, CardContent, Container, Divider } from "@mui/material";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  const getCartDetails = async () => {
    if (user) {
      const { payload } = await dispatch(getCart());
      if (payload.message === "success" && payload.cart.books.length) {
        setCart(payload.cart);
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    getCartDetails();
  }, []);

  return (
    <div className={styles["checkout-main-container"]}>
      {!user ? (
        <h1>You aren't logged in!</h1>
      ) : isLoading ? (
        <Loading />
      ) : !cart ? (
        <h1>Empty Cart</h1>
      ) : (
        <div className={styles["checkout-container"]}>
          <Container className={styles["sidebar"]}>
            <Card>
              <CardContent className="d-grid gap-5">
                <CartSummary cart={cart} />
                <Coupon />
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
