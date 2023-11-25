import { useDispatch, useSelector } from "react-redux";
import {
  decreaseCartQty,
  increaseCartQty,
} from "../../Redux/Slicies/cartSlice.js";
import styles from "./Cart.module.css";
import { Input } from "@mui/material";
import { updateCart } from "../../Redux/Slicies/cartAction.js";

export default function UpdataCart({ book, index }) {
  const dispatch = useDispatch();

  const { loading } = useSelector(({ cart }) => cart);
  const token = localStorage.getItem("access-token");
  const handlecartupdate = (qty) => {
    dispatch(updateCart({ book: book.book._id, qty }));
  };
  return (
    <div className={styles.quantityWrapper}>
      <div className={styles.quantityContent}>
        <button
          onClick={() => {
            if (token) handlecartupdate(book.qty - 1);
            else dispatch(decreaseCartQty(book?.book._id, index));
          }}
          disabled={book.qty === 1 || loading["cart/patchData"]}
          className={`${styles.btn}  ${styles.decBtn}`}
        >
          -
        </button>
        <Input
          type="number"
          className={styles.quantityInput}
          value={book.qty}
        />
        <button
          onClick={() => {
            if (token) handlecartupdate(book.qty + 1);
            else dispatch(increaseCartQty(book?.book._id, index));
          }}
          disabled={loading["cart/patchData"]}
          className={`${styles.btn}  ${styles.incBtn}`}
        >
          +
        </button>
      </div>
    </div>
  );
}
