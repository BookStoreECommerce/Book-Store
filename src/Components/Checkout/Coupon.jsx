import { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";

export default function RedeemCoupon({onSendCoupon}) {
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    onSendCoupon(inputValue);
  };

  const handleInputChange = (event) => setInputValue(event.target.value);

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
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Redeem
        </Button>
      </form>
    </div>
  );
}
