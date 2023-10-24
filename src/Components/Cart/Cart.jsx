import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import ScrollToTop from '../ReusableComponents/ScrollToTop/ScrollToTop';
import { Box } from '@mui/material';
import styles from './Cart.module.css'
import { Link } from 'react-router-dom';
import Loading from '../ReusableComponents/Loading/Loading';
import BookCard from '../ReusableComponents/BookCard/BookCard';
import image1 from '../../assets/1.jpg'
import { Button } from 'bootstrap';

export default function Cart() {
    const { isLoading } = useSelector((state) => state.cat);
    const { footerH, navH } = useSelector((state) => state.app);
    const { cartBooks } = useSelector((state) => state.cart);
    const [cartArray, setCartArray] = useState([
        {
            id: 1,
            title: '1984 Paperback',
            price: 756,
            author: 'George Orwell',
            img_url: image1,
            quantity: 1
        },
        {
            id: 2,

            title: '1984 Paperback',
            price: 756,
            author: 'George Orwell',
            img_url: image1,
            quantity: 1
        },
        {
            id: 3,

            title: '1984 Paperback',
            price: 756,
            author: 'George Orwell',
            img_url: image1,
            quantity: 1
        },
        {
            id: 4,

            title: '1984 Paperback',
            price: 756,
            author: 'George Orwell',
            img_url: image1,
            quantity: 2



        }
    ])



    // product Quantity
    function decrease(idx) {
        let newArr = [...cartArray]; // copying the old datas array
        newArr[idx].quantity -= 1;
        if (newArr[idx].quantity <= 0) {
            newArr[idx].quantity = 1
        }

        setCartArray(newArr)

    }
    function increase(idx) {

        let newArr = [...cartArray]; // copying the old datas array
        newArr[idx].quantity += 1;

        setCartArray(newArr)

    }
    return (
        <>
            <ScrollToTop />
            <Box sx={{ marginTop: `${navH}px`, minHeight: `calc(100vh - ${footerH + navH}px)`, }} className={styles.flex} >
                <div className={styles.badge}>
                    <span className={styles.slug}>Shopping Cart</span>
                    <div className={styles.content}>
                        <Link to='/'> <i className="fa-solid fa-home"></i> </Link>
                        <span className={styles.slash}> / <Link to='/Categories'>Your Cart</Link> </span>
                    </div>
                </div>
                <div className="container py-5">
                    {isLoading ? <Loading /> : <>
                        <div className="row justify-content-center align-items-center pb-2">
                            {cartArray?.length != 0 ?
                                <>
                                    {cartArray?.map((book, index) => (
                                        <div className={styles.orderCard} key={index}>
                                            <div className='row justify-content-between'>
                                                <div className='col-md-9'>
                                                    <div className='row'>
                                                        <div className='col-3'>
                                                            <div className={styles.bookCoverWrapper}>
                                                                <img src={book.img_url} alt="Book Cover" />
                                                            </div>
                                                        </div>
                                                        <div className={`${styles.bookDetails} col-4`}>
                                                            <div className={styles.titleAndPrice}>
                                                                <div className={styles.bookTitle}>
                                                                    {book.title}
                                                                </div>
                                                                <div className={styles.bookAuthor}>
                                                                    {book.author}
                                                                </div>
                                                            </div>

                                                            <div className={styles.bookPrice}>
                                                                {book.price} EGP
                                                            </div>

                                                            <div className={styles.quantityWrapper}>
                                                                <div className={styles.quantityContent}>
                                                                    <button onClick={() => decrease(index)} className={`${styles.btn}  ${styles.decBtn}`}>-</button>
                                                                    <input type='number' className={styles.quantityInput} value={book.quantity} />
                                                                    <button onClick={() => increase(index)} className={`${styles.btn}  ${styles.incBtn}`}>+</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-md-2'>
                                                    <div className={styles.deleteBook}>
                                                        <i class={` ${styles.trashIcon} fa-regular fa-trash-can`}></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </>
                                : <div className={styles.notFoundContainer}>
                                    <p>Your cart is empty</p>
                                </div>}
                        </div>


                    </>}
                </div>
            </Box>
        </>
    )
}
