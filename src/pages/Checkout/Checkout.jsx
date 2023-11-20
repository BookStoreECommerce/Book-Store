// import { Card, CardContent, Container } from "@mui/material";
// import { useCallback, useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import styles from "./Checkout.module.css";

// import CartSummary from "../../Components/Checkout/CartSummary";
// import Coupon from "../../Components/Checkout/Coupon";
// import Loading from "./../../Components/ReusableComponents/Loading/Loading";
// import { getCart } from "../../Redux/Slicies/cartAction";
// import { baseUrl } from "../../util/util";
// import axiosInstance from "../../axios/axios-instance";
// import CheckoutError from "../../Components/Checkout/CheckoutError";
// import UserCheckoutDetails from "../../Components/Checkout/UserCheckoutDetails";

// const Checkout = () => {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const cart = useSelector((state) => state.cart);

//   console.log("cart: ", cart);
//   // console.log("user: ", user);

//   return !user ? (
//     <CheckoutError majorText="401" minorText="Unauthorized" />
//   ) : cart.isLoading ? (
//     <Loading />
//   ) : !cart ? (
//     <CheckoutError
//       majorText="Empty Cart"
//       minorText="Add some books to your cart first"
//     />
//   ) : (
//     <div className={styles["checkout-main-container"]}>
//       <div className={styles["checkout-container"]}>
//         <Container className={styles["sidebar"]}>
//           <Card>
//             <CardContent className="d-grid gap-5">
//               <CartSummary cart={cart} />
//               <Coupon code={cart.coupon_code} />
//             </CardContent>
//           </Card>
//         </Container>
//         <Container className={styles["checkout-content"]}>
//           <UserCheckoutDetails />
//         </Container>
//       </div>
//     </div>
//   );
// };

// export default Checkout;

import {
  Container,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Checkout.module.css";

import CartSummary from "../../Components/Checkout/CartSummary";
import Coupon from "../../Components/Checkout/Coupon";
import Loading from "./../../Components/ReusableComponents/Loading/Loading";
import { getCart } from "../../Redux/Slicies/cartAction";
import { baseUrl } from "../../util/util";
import axiosInstance from "../../axios/axios-instance";
import CheckoutError from "../../Components/Checkout/CheckoutError";
import UserCheckoutDetails from "../../Components/Checkout/UserCheckoutDetails";
import {
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

const Checkout = () => {
  const dispatch = useDispatch();
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
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="cartSummaryPanelbh-content"
          id="cartSummaryPanelbh-header"
          className={styles["accordion-summary"]}
        >
          <Typography
            sx={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <ShoppingCartOutlinedIcon />
            <Typography variant={"h6"} sx={{ display: "inline-block" }}>
              Cart
            </Typography>
          </Typography>
          <div
            className={styles["total-container"]}
          >
            <Typography variant={"h6"} sx={{ paddingInlineEnd: "10px", display: "inline-block" }}>
              Total:{" "}
            </Typography>
            <Typography variant={hasDiscount ? "" : "h6"}
              sx={{
                paddingInlineEnd: "10px",
                color: hasDiscount ? "text.secondary" : "",
                textDecoration: hasDiscount ? "line-through" : "",
              }}
            >
              ${cart.totalAmount}
            </Typography>
            {hasDiscount && <Typography variant={"h6"}>${cart.totalAmountAfterDisc}</Typography>}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <CartSummary cart={cart} />
        </AccordionDetails>
      </Accordion>
      <UserCheckoutDetails />
    </Container>
  );
};

export default Checkout;
