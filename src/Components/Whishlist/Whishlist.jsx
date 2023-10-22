import React, { useEffect } from 'react';
import { removeFooterMargin, setFooterMargin } from "../../Redux/Slicies/appSlice";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useDispatch, useSelector } from "react-redux";

import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './Whishlist.module.css';
import book from '../../assets/bookCart.jpg'

export default function Whishlist() {
    const { footerH, navH } = useSelector((state) => state.app);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(removeFooterMargin());
        return () => dispatch(setFooterMargin());
    }, [dispatch]);

    return (
        <Box sx={{ marginTop: `${navH}px`, minHeight: `calc(100vh - ${footerH + navH}px)`, }}>
            <div className={styles.badge}>
                <span className={styles.slug}>my whishlist</span>
                <div className={styles.content}>
                    <Link to='/'> <i className="fa-solid fa-home"></i> </Link>
                    <span className={styles.slash}> / <Link to='/whishlist'>whishlist</Link></span>

                </div>
            </div>
            <div className="container pt-5">
                <div className="row mt-2">
               <div className="px-3"><p className={styles.items}>Items (1)</p><hr/></div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 pt-5">
                        <div className={styles.cartProduct}>
                            <div className={`${styles.cartImage} d-flex justify-content-center align-items-center`}>
                                <img src={book} alt="" className={styles.imgWidth} />
                            </div>
                        <button className={styles.removeBtn}><i className="fa-regular fa-trash-can"></i></button>
                        <div className={`badge ${styles.discount}`}>-35%</div>
                        </div>
                        <div className="cart-button">
                               <Link to='cart' className='text-decoration-none'> <button className={`${styles.cartButton} w-100 btn`}>
                                    <ShoppingCartOutlinedIcon sx={{ fontSize: { xs: 20, sm: 20, md: 23, lg: 20 } }}/>
                                    <span className='ms-2'>Add To Cart</span>
                                </button></Link>
                        </div>
                        <div className="cart-content text-center">
                            <p className={styles.bookName}>Nightborn: Totally addictive...</p>
                            <p className={styles.bookAuthor}>By Jessica Thorne</p>
                            <p className={styles.bookPrice}>500 EGP</p>
                        </div>
                    </div>
                </div>
            </div>
        </Box>
    )
}
