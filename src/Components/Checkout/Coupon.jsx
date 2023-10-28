import { useState } from 'react';
import { Typography, TextField, Button, Container, FormGroup } from "@mui/material";

export default function RedeemCoupon() {
    const [inputValue, setInputValue] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submitted value:', inputValue);
      };
    
      const handleInputChange = (event) => {
        setInputValue(event.target.value);
      };
  return (
    <div>
      <Typography variant="h6" component="h6">
        Redeem Coupon
      </Typography>

      <form onSubmit={handleSubmit} className="input-group d-flex p-3">
        {/* <FormGroup> */}
          <TextField
            id="coupon-code"
            label="Coupon Code"
            variant="outlined"
            className="form-control"
            value={inputValue}
        onChange={handleInputChange}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            handleSubmit(event);
          }
        }}
          />
          <Button variant="contained" color="primary">
            Redeem
          </Button>
        {/* </FormGroup> */}
      </form>
    </div>
  );
}