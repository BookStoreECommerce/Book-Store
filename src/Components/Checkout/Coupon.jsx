import { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import axiosInstance from "../../axios/axios-instance";
import { baseUrl } from "../../util/util";
import { useDispatch } from "react-redux";

export default function RedeemCoupon({code, onCouponChange}) {
  const dispatch = useDispatch();
  // const [cart, setCart] = useState(null);
  const [couponCode, setCouponCode] = useState(code || "");

  const sendCouponHandler = async (couponCode) => {
    try {
      const { data } = await axiosInstance.patch(`${baseUrl}cart/coupon`,{code: 'code55'});
      // onCouponChange(data.cart);
      console.log(data.cart);
      // data.result.length && setOptions(data.result);
    } catch (error) {
    }
  };
  const removeCouponHandler = async () => {
    try {
      const { data } = await axiosInstance.delete(`${baseUrl}cart/coupon/${code}`);
      // onCouponChange(data.cart);
      
      // data.result.length && setOptions(data.result);
    } catch (error) {
    }
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!couponCode.length) return;
    if (code) {
      removeCouponHandler();
    } else {
      sendCouponHandler(couponCode);
    }
    // console.log(cart);
    // onCouponChange(cart);
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
          // disabled={code !== ""}
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
