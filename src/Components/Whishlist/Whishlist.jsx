import React, { useEffect, useState } from 'react';
import { removeFooterMargin, setFooterMargin } from "../../Redux/Slicies/appSlice";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useDispatch, useSelector } from "react-redux";
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { getWhishList, getWhishListBooks } from '../../Redux/Slicies/whishlistActions';
import { getUserProfile } from '../../Redux/Slicies/authActions';
import Loading from '../ReusableComponents/Loading/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Whishlist.module.css'
import AddCart from '../Cart/AddCart.jsx';
export default function Whishlist() {
    const { footerH, navH } = useSelector((state) => state.app);
    const [loading, setLoading] = useState(false)
    const [spinerLoading, setSpinerLoading] = useState(false)
    const { user } = useSelector((state) => state.auth);
    const { whishlist } = useSelector((state) => state.whishlist);
    const { whishListBooks } = useSelector((state) => state.whishListBooks)
    const WhislistBookId = user.wish_List.map((ele) => ele);
    const dispatch = useDispatch();


    const WhishList = async (bookId) => {
        setSpinerLoading(true)
        await dispatch(getWhishList(bookId))
      let arr = JSON.parse(localStorage.getItem('whishList'))
        await dispatch(getUserProfile())
        toast.error("Remove from wishlist!", {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            closeButton: false
        });
        setSpinerLoading(false)
    }

    const handleProduct = async () => {
        await dispatch(getWhishListBooks());
        setLoading(true)
    };

    let WhishListFilterArray = [];
    for (let i = 0; i < WhislistBookId.length; i++) {
        WhishListFilterArray.push(
            whishListBooks.find((ele) => ele._id === WhislistBookId[i])
        );
    }

    useEffect(() => {
        handleProduct()
        dispatch(removeFooterMargin());

        dispatch(getUserProfile())
        return () => dispatch(setFooterMargin());
    }, [dispatch]);

    return (
        <Box sx={{ marginTop: `${navH}px`, minHeight: `calc(100vh - ${footerH + navH}px)`, }}>
            <div className={styles.badge}>
                <span className={styles.slug}>my wishlist</span>
                <div className={styles.content}>
                    <Link to='/'> <i className="fa-solid fa-home"></i> </Link>
                    <span className={styles.slash}> / <Link to='/whishlist'>wishlist</Link></span>

                </div>
            </div>
            <div className="container pt-5">
                <div className="row mt-2 justify-content-center align-items-center mb-5 px-lg-0 px-4">
                    {!loading ? <Loading /> : <>
                        <div className="px-3"><p className={styles.items}>Items ({WhishListFilterArray.length}) {spinerLoading?<i className="fa fa-spinner fa-spin"></i>:""}</p><hr /></div>
                        {WhishListFilterArray?.length === 0 ? <>
                            <div className={styles.notFoundContainer}>
                                <div>
                                    <p>Your wishList is empty!</p>
                                    <h6>Explore more and shortlist some items</h6>
                                    <Link to="/book"><button className={`${styles.btn} btn`}>Start Shopping</button></Link>
                                </div>
                            </div>
                        </> :
                            <>
                                {WhishListFilterArray.map((book, index) =>
                                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 pt-5" key={index}>
                                      <div className={styles.cartProduct}>
                                      <Link to={`/book/${book?.slug}`} className='text-decoration-none'> 
                                            <div className={` d-flex justify-content-center align-items-center ${styles.cartImage}`}>
                                                <img src={book?.image?.secure_url} alt="" className={styles.imgWidth} />
                                            </div>
                                            </Link>
                                            <button className={styles.removeBtn} onClick={() => WhishList(book?._id)}><i className="fa-regular fa-trash-can"></i></button>
                                            <ToastContainer position="bottom-left"
                                                autoClose={2000}
                                                hideProgressBar={false}
                                                newestOnTop={false}
                                                closeOnClick={false}
                                                rtl={false}
                                                pauseOnFocusLoss
                                                closeButton={false}
                                                draggable
                                                pauseOnHover={false}
                                                theme="light" />
                                        </div>
                                        <div className="cart-button">
                                            {/* <Link to='cart' className='text-decoration-none'> <button className={`${styles.cartButton} w-100 btn`}>
                                                <ShoppingCartOutlinedIcon sx={{ fontSize: { xs: 20, sm: 20, md: 23, lg: 20 } }} />
                                                <span className='ms-2'>Add To Cart</span>
                                            </button></Link> */}
                                            <AddCart book={book} component="wishList">Add Cart</AddCart>
                                        </div>
                                        <Link to={`/book/${book?.slug}`} className='text-decoration-none'> 
                                        <div className="cart-content d-flex flex-column justify-content-center align-items-center">
                                            <p className={styles.bookName} >{book?.name.length > 20 ? book?.name.slice(0, 20) : book?.name}{book?.name.length > 20 ? `...` : ''}</p>
                                            <p className={styles.bookAuthor}>{book?.author}</p>
                                            <p className={styles.bookPrice}>{book?.price} EGP</p>
                                        </div>
                                        </Link>
                                    </div>
                                )}

                            </>

                        }

                    </>}


                </div>
            </div>
        </Box>
    )
}
