import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ScrollToTop from '../ReusableComponents/ScrollToTop/ScrollToTop';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Loading from '../ReusableComponents/Loading/Loading';
import ClearCart from './ClearCart';
import DeleteCartItem from './DeleteCartItem';
import { getCartWithoutToken, setCartInLocalStorage, updateCart } from '../../Redux/Slicies/cartAction';
import { Button } from "@mui/material";

import styles from './Cart.module.css'


export default function Cart() {
    // const { isLoading } = useSelector((state) => state.cart);
    const { footerH, navH } = useSelector((state) => state.app);
    const { cartBooks, isLoading ,localStorageCart} = useSelector((state) => state.cart);
    const {token} = useSelector((state) => state.auth);
    let cartArray ;
    console.log("localStorageCart",localStorageCart);
    if(token){
        cartArray = cartBooks;
    }else if(token == null){
        cartArray = JSON.parse(localStorage.getItem('cartDetails'));
        // cartArray = localStorageCart;
    }
    // console.log(cartArray);

    const dispatch = useDispatch();

    function decrease(book, index) {
        cartArray[index].qty = cartArray[index].qty - 1;
        dispatch(setCartInLocalStorage(cartArray));
        // let qty = cartArray[index].qty - 1;
        // dispatch(updateCart({ book, qty }));
    }
    function increase(book, index) {
        console.log(cartArray);
        cartArray[index].qty = cartArray[index].qty + 1;
        console.log(cartArray);
        dispatch(setCartInLocalStorage(cartArray));
        // localStorage.setItem('cartDetails',JSON.stringify(cartArray))
        // console.log({ book, qty });
        // dispatch(updateCart({ book, qty }));
    }
    useEffect(()=>{
        dispatch(getCartWithoutToken());
    },[dispatch])
    return (
        <>
            <ScrollToTop />
            <Box sx={{ marginTop: `${navH}px`, minHeight: `calc(100vh - ${footerH + navH}px)`, }} className={styles.flex} >
                <div className={styles.badge}>
                    <span className={styles.slug}>Shopping Cart</span>
                    <div className={styles.content}>
                        <Link to='/'> <i className="fa-solid fa-home"></i> </Link>
                        <span className={styles.slash}> / <Link to='/cart'>Your Cart</Link> </span>
                    </div>
                </div>
                <div className="container  ">

                    {isLoading ? <Loading /> : <>



                        <div className="row justify-content-center align-items-center pb-2">
                            {cartArray?.length !== 0 ?
                                <>
                                    <div className={styles.checkoutBtn}>
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

                                        >
                                            Ckeckout
                                        </Button>
                                    </div>

                                    {cartArray?.map((book, index) => (
                                      console.log("book from map",book),
                                        <div className={`${styles.orderCard} col-lg-7 col-md-8 col-sm-10 col-10`} key={index}>
                                            <div className={`row justify-content-between ${styles.cardParent}`}>
                                                <div className='col-md-11'>
                                                    <div className='row'>
                                                        <div className='col-sm-3 col-4'>
                                                            <Link to={`/book/${book.book.slug}`}>
                                                                <div className={styles.bookCoverWrapper}>
                                                                    <img src={book.image?.secure_url} alt="Book Cover" />
                                                                </div>

                                                            </Link>

                                                        </div>
                                                        <div className={`${styles.bookDetails} col-sm-9 col-8 ps-0`}>
                                                            <div className={styles.titleAndPrice}>
                                                                <div className={styles.bookTitle}>
                                                                    {book.name}
                                                                </div>
                                                                <div className={styles.bookAuthor}>
                                                                   By {book.author}
                                                                </div>
                                                            </div>

                                                            <div className={styles.bookPrice}>
                                                                {book.price} EGP
                                                            </div>

                                                            <div className={styles.quantityWrapper}>
                                                                <div className={styles.quantityContent}>
                                                                    <button disabled={book.qty === 1} onClick={() => decrease(book?.book._id, index)} className={`${styles.btn}  ${styles.decBtn}`}>-</button>
                                                                    <input type='number' className={styles.quantityInput} value={book.qty} />
                                                                    <button onClick={() => increase(book?.book._id, index)} className={`${styles.btn}  ${styles.incBtn}`}>+</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={` ${styles.deleteAndSubTotal}  `}>
                                                    <DeleteCartItem id={book?.book.id}  />

                                                </div>
                                                <div className={styles.bookSubTotal}>
                                                    {book.price * book.qty} EGP
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <ClearCart />
                                </>
                                : <div className={styles.notFoundContainer}>
                                    <div className={styles.notFoundContainer}>
                                        <p>No Items Found In Cart</p>
                                    </div>
                                </div>}
                        </div>


                    </>}



                </div>
            </Box>
        </>
    )
}
