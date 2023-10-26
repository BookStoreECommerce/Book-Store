import CartSummary from "../../Components/Checkout/CartSummary";
import Coupon from "../../Components/Checkout/Coupon";
// import classes from "./Checkout.modules.css"
import styles from "./Checkout.module.css";

const Checkout = () => {
  return (
    <div className={styles["checkout-container"]}>
      <div className={styles["checkout-content"]}>checkout</div>
      <div className={styles["sidebar"]}>
        <CartSummary />
        <Coupon />
      </div>
    </div>
  );
};

export default Checkout;
