import { useEffect, useState } from "react";
import CartSummary from "../../Components/Checkout/CartSummary";
import Coupon from "../../Components/Checkout/Coupon";
import styles from "./Checkout.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [isCartEmpty, setIsCartEmpty] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    (!user || isCartEmpty) && navigate("/chekout");
  }, [isCartEmpty, navigate]);

  return (
    <div className={styles["checkout-container"]}>
      <div className={styles["checkout-content"]}>checkout</div>
      <div className={styles["sidebar"]}>
        <CartSummary isEmpty={(isEmpty) => isEmpty && setIsCartEmpty(true)} />
        <Coupon />
      </div>
    </div>
  );
};

export default Checkout;
