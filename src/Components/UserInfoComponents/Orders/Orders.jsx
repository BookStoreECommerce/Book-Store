import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import ScrollToTop from "../ReusableComponents/ScrollToTop/ScrollToTop";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
// import Loading from "../ReusableComponents/Loading/Loading";
import styles from "./Orders.module.css";
import { getOrders } from "../../../Redux/Slicies/orderAction";
import Loading from "../../ReusableComponents/Loading/Loading";
import ScrollToTop from "../../ReusableComponents/ScrollToTop/ScrollToTop";
import AddReview from "../../ReviewComponents/AddReview/AddReview";
import ReviewDialog from "../../Dialogs/ReviewDialog/ReviewDialog";
import { handleReviewOpen } from "../../../Redux/Slicies/dialogSlice";
// import { getOrders } from "../../Redux/Slicies/orderAction";
import rate from '../../../assets/rate.svg';


export default function Orders() {
  const dispatch = useDispatch();

  const { footerH, navH } = useSelector((state) => state.app);
  const { orders, isLoading } = useSelector((state) => state.orders);
  const token = localStorage.getItem('access-token');
  const [idBook, setId] = useState("")
  const [reviewBook, setReviewBook] = useState(null)
  const ordersArray = orders.orders;
  console.log(ordersArray);
  const pdfBooksArray = orders.pdfBooks;

  const getAllOrders = () => {
    dispatch(getOrders(token));
  };
  useEffect(() => {
    getAllOrders();
  }, [dispatch]);
  function getId(id, reviews) {
    setId(id)
    setReviewBook(reviews)
    dispatch(handleReviewOpen())

  }
  return (
    <>
      <ScrollToTop />
      <ReviewDialog id={idBook} review={reviewBook} />
      <Box
        sx={{
          marginTop: `${navH}px`,
          minHeight: `calc(100vh - ${footerH + navH}px)`,
        }}
        className={styles.flex}
      >

        <div className="container">


          <div className="row justify-content-center align-items-center pb-2">
            {ordersArray?.length >= 0 || pdfBooksArray?.length >= 0 ? (
              <>

                <ul className={`nav nav-pills mb-3 ${styles.navTabs}`} id="pills-tab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button className={`nav-link active ${styles.links}`} id="pills-all-tab" data-bs-toggle="pill" data-bs-target="#pills-all"
                      type="button" role="tab" aria-controls="pills-all" aria-selected="true">Books</button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className={`nav-link ${styles.links}`} id="pills-brand-tab" data-bs-toggle="pill" data-bs-target="#pills-brand"
                      type="button" role="tab" aria-controls="pills-brand" aria-selected="false">PDF</button>
                  </li>


                </ul>

                <div className="tab-content" id="pills-tabContent">
                  <div className="tab-pane fade show active" id="pills-all" role="tabpanel" aria-labelledby="pills-all-tab"
                    tabIndex="0">

                    {ordersArray?.map((order, index) =>


                      <div className={`col-xl-10 col-lg-12 col-12 mb-5`} key={index} >
                        <div className={`${styles.orderCard} mb-3`}>
                          <div className={`${styles.cardHeader}`}>
                            <p className={`${styles.orderNum} `}>Order # {order.serial_number}</p>

                            <p className={`${styles.orderDate} `}>Date goes here</p>
                          </div>
                          <div className={`${styles.cardBody}`}>
                            {order.books?.map((orderBook, index) =>
                        
                                <div className={`${styles.orderBook} mb-0`} key={index}>
                                  <div className={`${styles.bookRow}`}>
                                    <div className={`col-lg-4 col-10`}>
                                      <div className={`${styles.bookInfo}`}>
                                        <div className={`${styles.bookImgContainer}`}>
                                          <img src={orderBook.book.image.secure_url} alt="book img" />
                                        </div>
                                        <div className={`${styles.bookImgTitle}`}>
                                          <p className={`mb-0 ${styles.bookName}`}> {orderBook.book.name.slice(0,30)}...</p>                               
                                        </div>
                                      </div>
                                    </div>
                                    <div className={`col-lg-2 col-12 d-flex justify-content-center align-items-center ${styles.flexStart}`}>
                                      <div className={`${styles.bookVariation}`}>
                                        {orderBook.variation_name}
                                      </div>
                                    </div>
                                    <div className={`col-lg-2 col-12 d-flex justify-content-center align-items-center ${styles.flexStart}`}>
                                      <div className={`${styles.bookPriceAndQty}`}>
                                        {orderBook.price} EGP X {orderBook.qty}
                                      </div>
                                    </div>
                                    <div className={`col-lg-2  col-12 d-flex justify-content-center align-items-center ${styles.flexStart}`}>
                                      <div className={`${styles.bookSubTotal}`}>
                                        {orderBook.totalPrice} EGP
                                      </div>
                                    </div>
                                    <div className={`col-lg-2 col-12 d-flex justify-content-center align-items-center ${styles.flexStart}`}>
                                      <button onClick={() => getId(orderBook?.book.id, orderBook?.book.reviews)} className={styles.btn}><img src={rate} alt="" className={styles.rate}/></button>
                                    </div>

                                  </div>
                                </div>

                           
                            )}
                          </div>
                          <div className={`${styles.cardFooter}`}>

                            <p className={`${styles.orderStatus} `}>
                              Status: {order.isDelivered === 'true' ? <b>Delivered</b> : <b>Pending</b>}
                            </p>
                            <p className={`${styles.orderTotal} `}>Total: {order.totalAmountAfterDisc}</p>
                          </div>


                        </div>
                      </div>


                    )}

                  </div>


                  <div className="tab-pane fade" id="pills-brand" role="tabpanel" aria-labelledby="pills-brand-tab" tabIndex="0">
                    {pdfBooksArray?.map((order, index) =>


                      <div className={`col-lg-12  col-12`} key={index} >
                        <div className={`${styles.orderCard} mb-3`}>
                          <div className={`${styles.cardHeader}`}>
                            <p className={`${styles.orderNum} `}>Order # {order.serial_number}</p>

                            <p className={`${styles.orderDate} `}>Date goes here</p>
                          </div>
                          <div className={`${styles.cardBody}`}>

                            <>
                              <div className={`${styles.orderBook} mb-0`} >
                                <div className={`${styles.bookRow}`}>
                                  <div className={`col-lg-7 col-12`}>
                                    <div className={`${styles.pdfInfo}`}>
                                      <div className={`${styles.bookImgContainer}`}>
                                        <img src={order.image.secure_url} alt="book img" />
                                      </div>
                                      <div className={`${styles.bookImgTitle}`}>

                                        <a href={order.variations[0].variation_url.secure_url}
                                          className={`${styles.pdfLink}`}
                                          target="_blank" >{order.name}</a>
                                      </div>

                                    </div>
                                  </div>



                                </div>
                              </div>

                            </>


                          </div>



                        </div>
                      </div>


                    )}
                  </div>

                </div>

              </>
            ) : (
              <div className={styles.notFoundContainer}>
                <div className={styles.notFoundContainer}>
                  <p>No Items Found In Cart</p>
                </div>
              </div>
            )}
          </div>


        </div>
      </Box>
    </>
  )
}
