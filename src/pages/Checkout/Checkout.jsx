import {
  Container,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

import styles from "./Checkout.module.css";

import CartSummary from "../../Components/Checkout/CartSummary";
import Coupon from "../../Components/Checkout/Coupon";
import Loading from "./../../Components/ReusableComponents/Loading/Loading";
import CheckoutError from "../../Components/Checkout/CheckoutError";
import UserCheckoutDetails from "../../Components/Checkout/UserCheckoutDetails";
import {
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

const Checkout = () => {
  const { user } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const hasDiscount = cart.totalAmount !== cart.totalAmountAfterDisc;

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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
    <Container className={styles["checkout-main-container"]}>
      <div className="d-flex justify-content-between flex-column flex-md-row">
        <h1>Checkout</h1>
        <Coupon code={cart.coupon_code} />
      </div>

      <Accordion
        expanded={expanded === "cartSummaryPanel"}
        onChange={handleChange("cartSummaryPanel")}
        className={styles["accordion"]}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="cartSummaryPanelbh-content"
          id="cartSummaryPanelbh-header"
          className={styles["accordion-summary"]}
        >
          <Typography
            sx={{ display: "flex", alignItems: "center", gap: "10px", fontSize: '1.25rem' }}
          >
            <ShoppingCartOutlinedIcon />
            Cart
          </Typography>
          <div
            className={styles["total-container"]}
          >
            <Typography sx={{ paddingInlineEnd: "10px", fontSize: '1.25rem' }}>
              Total:{" "}
            </Typography>
            <Typography
              sx={{
                paddingInlineEnd: "10px",
                color: hasDiscount ? "text.secondary" : "",
                textDecoration: hasDiscount ? "line-through" : "",
                fontSize: hasDiscount? "1rem": '1.25rem',
              }}
            >
              {cart.totalAmount} EGP
            </Typography>
            {hasDiscount && <Typography sx={{ fontSize: '1.25rem' }}>{cart.totalAmountAfterDisc} EGP</Typography>}
          </div>
        </AccordionSummary>
        <AccordionDetails className={styles['accordion-details']}>
          <CartSummary cart={cart} />
        </AccordionDetails>
      </Accordion>
      <UserCheckoutDetails />
    </Container>
  );
};

export default Checkout;
