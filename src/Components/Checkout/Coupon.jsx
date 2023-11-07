import { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { addCoupon, removeCoupon } from "../../Redux/Slicies/cartAction";

export default function RedeemCoupon({code}) {
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState(code || "");
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!couponCode.length) return;
    code? dispatch(removeCoupon(couponCode)): dispatch(addCoupon(couponCode));
  };

  const handleInputChange = (event) => setCouponCode(event.target.value);

  return (
    <div>
      <Typography variant="h6" component="h6">
        Redeem Coupon
      </Typography>
      <form onSubmit={handleSubmit} className="input-group d-flex p-3">
        <TextField
          id="coupon-code"
          label="Coupon Code"
          variant="outlined"
          className="form-control"
          disabled={code !== ""}
          value={couponCode}
          onChange={handleInputChange}
        />
        <Button type="submit" variant="contained" color="primary">
          {code? "Remove" : "Redeem"}
        </Button>
      </form>
    </div>
  );
}
