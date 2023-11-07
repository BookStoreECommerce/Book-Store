import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ScrollToTop from '../ReusableComponents/ScrollToTop/ScrollToTop';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Loading from '../ReusableComponents/Loading/Loading';
import ClearCart from './ClearCart';
import DeleteCartItem from './DeleteCartItem';
import { updateCart } from '../../Redux/Slicies/cartAction';
import { Button } from "@mui/material";

import styles from './Cart.module.css'
import { addToCart, decreaseCartQty, getCartWithoutToken, increaseCartQty, setCartInLocalStorage } from '../../Redux/Slicies/cartSlice';
import { array } from 'yup';


export default function Cart() {
    // <div className={styles.bookAuthor}>
    //    By {book.book.author}
    // </div>

    const { footerH, navH } = useSelector((state) => state.app);
    const { books, isLoading, localStorageCart } = useSelector((state) => state.cart);
    const { token } = useSelector((state) => state.auth);
    let cartArray = [];


    if (token) {
        cartArray = books;
        console.log(books);
    } else if (token == null) {
        // cartArray = JSON.parse(localStorage.getItem('cartDetails'));
        cartArray = localStorageCart?.books;
        console.log(cartArray);
    }

    const dispatch = useDispatch();






    useEffect(() => {
        dispatch(getCartWithoutToken());
    }, [dispatch])

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
                            {localStorageCart?.books?.length >= 0 ?
                                <>
                                    {localStorageCart?.books?.length > 0 ? <div className={styles.checkoutBtn}>
                                        <Button
                                            variant="outlined"
                                            component={Link}
                                            to="/checkout"
                                            endIcon={
                                                isLoading ? (
                                                    <i className="fas fa-spinner fa-spin"></i>
                                                ) : (
                                                    <i className="fa-solid"></i>
                                                )
                                            }
                                            className={`mainBtn ${styles.fitContent}`}

                                        >
                                            Checkout
                                        </Button>
                                    </div> : ''}

                                    {localStorageCart?.books?.map((book, index) => (
                                        <div className={`${styles.orderCard} col-lg-7 col-md-8 col-sm-10 col-10`} key={index}>
                                            <div className={`row justify-content-between ${styles.cardParent}`}>
                                                <div className='col-md-11'>
                                                    <div className='row'>
                                                        <div className='col-sm-3 col-4'>
                                                            <Link to={`/book/${book.book.slug}`}>
                                                                <div className={styles.bookCoverWrapper}>
                                                                    <img src={book.book.image?.secure_url || book.book.image} alt="Book Cover" />
                                                                </div>

                                                            </Link>

                                                        </div>
                                                        <div className={`${styles.bookDetails} col-sm-9 col-8 ps-0`}>
                                                            <div className={styles.titleAndPrice}>
                                                                <div className={styles.bookTitle}>
                                                                    {book.book.name}
                                                                </div>

                                                            </div>

                                                            <div className={styles.bookPrice}>
                                                                {book.price} EGP
                                                            </div>

                                                            <div className={styles.quantityWrapper}>
                                                                <div className={styles.quantityContent}>
                                                                    <button disabled={book.qty === 1} onClick={() => dispatch(decreaseCartQty(book?.book._id, index))} className={`${styles.btn}  ${styles.decBtn}`}>-</button>
                                                                    <input type='number' className={styles.quantityInput} value={book.qty} />
                                                                    <button onClick={() => dispatch(increaseCartQty(book?.book._id, index))} className={`${styles.btn}  ${styles.incBtn}`}>+</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={` ${styles.deleteAndSubTotal}  `}>
                                                {console.log(book.book._id)}
                                                    <DeleteCartItem id={book?.book._id} />

                                                </div>
                                                <div className={styles.bookSubTotal}>
                                                    {book.price * book.qty} EGP
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {cartArray.length > 0 ? <ClearCart /> : <div className={styles.notFoundContainer}>
                                        <div className={styles.notFoundContainer}>
                                            <p>No Items Found In Cart</p>
                                        </div>
                                    </div>}

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
