import React from 'react'
import { deleteCartItem } from '../../Redux/Slicies/cartAction';
import { useDispatch } from 'react-redux';
import styles from "./DeleteCartItem.module.css";

function DeleteCartItem({ id }) {
  const dispatch = useDispatch();

  const removeCartItem = async () => {
    await dispatch(deleteCartItem({ book: id }));
  }

  return (
    <>
      <div className={styles.deleteBook} onClick={() => removeCartItem()}>
        <i className={` ${styles.trashIcon} fa-regular fa-trash-can`}></i>
      </div>
    </>
  )
}

export default DeleteCartItem
