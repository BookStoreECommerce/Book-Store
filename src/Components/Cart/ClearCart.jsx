import React from 'react'
import { clearCart, clearLocalStorageCArt, setCartInLocalStorage } from '../../Redux/Slicies/cartAction';
import { useDispatch, useSelector } from 'react-redux';
import styles from "./ClearCart.module.css";
import { Button } from "@mui/material";

function ClearCart() {
  const { isLoading } = useSelector((state) => state.cart);
  const {token} = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const removeCart = async () => {
    if(token == null){
      let cartArray = [];
      dispatch(setCartInLocalStorage(cartArray));
      dispatch(clearLocalStorageCArt('cartDetails'));

    }
    await dispatch(clearCart());
  }

  return (
    <>
      <div className="text-center" >
        <Button
          variant="outlined"
          type="submit"
          endIcon={
            isLoading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              <i className="fa-solid"></i>
            )
          }
          className={`mainBtn ${styles.fitContent}`}
          onClick={() => removeCart()}
        >
          Clear Cart
        </Button>
      </div>
    </>
  )
}

export default ClearCart
