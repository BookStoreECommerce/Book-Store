import { useState } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addCoupon, removeCoupon } from "../../Redux/Slicies/checkoutActions";
import styles from "./Coupon.module.css";

export default function RedeemCoupon({ code }) {
  const dispatch = useDispatch();
  const checkout = useSelector(({ checkout }) => checkout);
  const [couponCode, setCouponCode] = useState(code || "");

  const handleSubmit = async (event) => {
    event.preventDefault();
    !code
      ? dispatch(addCoupon(couponCode))
      : (await dispatch(removeCoupon(couponCode))) && setCouponCode("");
  };

  const handleInputChange = (e) => setCouponCode(e.target.value);

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className={`${styles["coupon-form"]} input-group d-flex`}
      >
        <TextField
          id="coupon-code"
          label="Coupon Code"
          helperText={checkout.couponErrorMsg && checkout.couponErrorMsg}
          variant="outlined"
          className="form-control"
          disabled={code || checkout.isCouponLoading}
          value={couponCode}
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={!couponCode || checkout.isCouponLoading}
          sx={{ color: code ? "error" : "primary", width: "6rem" }}
        >
          {checkout.isCouponLoading ? (
            <CircularProgress color="inherit" size={20} />
          ) : code ? (
            "Remove"
          ) : (
            "Redeem"
          )}
        </Button>
      </form>
    </div>
  );
}
