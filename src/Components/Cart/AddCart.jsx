import React from 'react'
import { addCart } from '../../Redux/Slicies/cartAction';
import { useDispatch } from 'react-redux';
import styles from "./AddCart.module.css";
function AddCart({ id }) {
  const dispatch = useDispatch();
  // const { totalCartBooks } = useSelector((state) => state.cart);

  const addCartProduct = async () => {
    await dispatch(addCart({ book: id }));
  }

  return (
    <>
      <span className={` ${styles.pointer}  text-decoration-none`} >
        <span className={styles.icon} onClick={() => addCartProduct()}>
          <i className="fa-solid fa-cart-shopping" ></i>
        </span>
      </span>
    </>
  )
}

export default AddCart
