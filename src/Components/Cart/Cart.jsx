import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ScrollToTop from '../ReusableComponents/ScrollToTop/ScrollToTop';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Loading from '../ReusableComponents/Loading/Loading';
import ClearCart from './ClearCart';
import DeleteCartItem from './DeleteCartItem';
import { updateCart } from '../../Redux/Slicies/cartAction';
import styles from './Cart.module.css'


export default function Cart() {
    // const { isLoading } = useSelector((state) => state.cart);
    const { footerH, navH } = useSelector((state) => state.app);
    const { cartBooks , isLoading} = useSelector((state) => state.cart);
    const cartArray = cartBooks;

    const dispatch = useDispatch();

    function decrease(book, index) {
        let qty = cartArray[index].qty - 1;
        dispatch(updateCart({ book, qty }));
    }
    function increase(book, index) {
        let qty = cartArray[index].qty + 1;

        console.log({ book, qty });
        dispatch(updateCart({ book, qty }));
    }
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
                <div className="container position-relative ">
                    {isLoading ? <Loading /> : <>
                    <div>
                        <button className={`${styles.checkoutBtn}`}>Checkout</button>
                    </div>
                        <div className="row justify-content-center align-items-center pb-2 py-5">
                            {cartArray?.length !== 0 ?
                                <>
                                    {cartArray?.map((book, index) => (
                                        <div className={`${styles.orderCard} col-lg-7 col-md-8 col-sm-10 col-10` } key={index}>
                                            <div className={`row justify-content-between ${styles.cardParent}`}>
                                                <div className='col-md-11'>
                                                    <div className='row'>
                                                        <div className='col-sm-3 col-4'>
                                                            <div className={styles.bookCoverWrapper}>
                                                                <img src={book.book.image.secure_url} alt="Book Cover" />
                                                            </div>
                                                        </div>
                                                        <div className={`${styles.bookDetails} col-sm-9 col-8 ps-0`}>
                                                            <div className={styles.titleAndPrice}>
                                                                <div className={styles.bookTitle}>
                                                                    {book.book.name}
                                                                </div>
                                                                <div className={styles.bookAuthor}>
                                                                    {book.author}
                                                                </div>
                                                            </div>

                                                            <div className={styles.bookPrice}>
                                                                {book.book.price} EGP
                                                            </div>

                                                            <div className={styles.quantityWrapper}>
                                                                <div className={styles.quantityContent}>
                                                                    <button disabled={book.qty === 1}  onClick={() => decrease(  book?.book._id ,index)} className={`${styles.btn}  ${styles.decBtn}`}>-</button>
                                                                    <input type='number' className={styles.quantityInput} value={book.qty} />
                                                                    <button onClick={() => increase(book?.book._id, index)} className={`${styles.btn}  ${styles.incBtn}`}>+</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={` ${styles.deleteAndSubTotal}  `}>
                                                    <DeleteCartItem id={book?.book._id} />
                                                   
                                                </div>
                                                <div className={styles.bookSubTotal}>
                                                {book.book.price * book.qty} EGP
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
