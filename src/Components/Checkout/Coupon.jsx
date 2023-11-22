

import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { addCoupon, removeCoupon } from "../../Redux/Slicies/cartAction";
import styles from "./Coupon.module.css"

export default function RedeemCoupon({ code }) {
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState(code || "");
  const [couponError, setCouponError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!couponCode.length) return;
    setCouponError(null);
    if (code) {
      await dispatch(removeCoupon(couponCode)) && setCouponCode("");
    } else {
      const response = await dispatch(addCoupon(couponCode));
      if (response.payload.message.toLowerCase() === "error") {
        setCouponError(response.payload.error);
      }
    }
  };

  const handleInputChange = (event) => setCouponCode(event.target.value);

  return (
    <div>
      {/* <Typography variant="h6" component="h6">
        Redeem Coupon
      </Typography> */}
      <form onSubmit={handleSubmit} className={`${styles['coupon-form']} input-group d-flex`}>
        <TextField
          id="coupon-code"
          label="Coupon Code"
          helperText={couponError && couponError}
          variant="outlined"
          className="form-control"
          disabled={code !== ""}
          value={couponCode}
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          variant="contained"
          color={code ? "error" : "primary"}
        >
          {code ? "Remove" : "Redeem"}
        </Button>
      </form>
    </div>
  );
}
