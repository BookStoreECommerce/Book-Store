import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScrollToTop from "../ReusableComponents/ScrollToTop/ScrollToTop";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import Loading from "../ReusableComponents/Loading/Loading";
import styles from "./PrevOrders.module.css";
import { getOrders } from "../../Redux/Slicies/orderAction";


export default function PrevOrders() {
  const dispatch = useDispatch();

  const { footerH, navH } = useSelector((state) => state.app);
  const { orders, isLoading } = useSelector((state) => state.orders);
  const token = localStorage.getItem('access-token');
  const ordersArray = orders.orders;
  // const booksArray = orders.orders.books;
  const pdfBooksArray = orders.pdfBooks;
  console.log(ordersArray);
  console.log(pdfBooksArray);
  // console.log(booksArray);

  const getAllOrders = () => {
    dispatch(getOrders(token));
  };
  useEffect(() => {
    // console.log(token);
    getAllOrders();
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />
      <Box
        sx={{
          marginTop: `${navH}px`,
          minHeight: `calc(100vh - ${footerH + navH}px)`,
        }}
        className={styles.flex}
      >
        <div className={styles.badge}>
          <span className={styles.slug}>Orders</span>
          <div className={styles.content}>
            <Link to="/">
              {" "}
              <i className="fa-solid fa-home"></i>{" "}
            </Link>
            <span className={styles.slash}>
              {" "}
              / <Link to="/cart">Your Orders</Link>{" "}
            </span>
          </div>
        </div>
        <div className="container  ">
          {isLoading ? (
            <Loading />
          ) : (
            <>

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


                          <div className={` col-lg-12 col-md-12 col-sm-12 col-12`} key={index} >
                            <div className={`${styles.orderCard} mb-3`}>
                              <div className={`${styles.cardHeader}`}>
                                <p className={`${styles.orderNum} `}>Order # {order._id}</p>
                                <p className={`${styles.orderDate} `}>26-11-2023</p>
                              </div>
                              <div className={`${styles.cardBody}`}>
                              {order.books?.map((orderBook, id) =>
                                <>
                                <div className={`${styles.orderBook} mb-0`} key={id}>
                                 <div className={`${styles.bookRow}`}>
                                  <div className={`col-4`}>
                                  
                                  
                                  <div className={`${styles.bookInfo}`}>
                                  <div className={`${styles.bookImgContainer}`}>
                                  <img src={orderBook.book.image.secure_url} alt="book img" />
                                  </div>
                                  <div className={`${styles.bookImgTitle}`}>
                                <p key={id} className={`mb-0`}> {orderBook.book.name}</p>

                                  </div>
                                  
                                  </div>
                                  </div>
                                 </div>
                                </div>
    
                                </>
    
                              )}
                              </div>
                              <div className={`${styles.cardFooter}`}>
                              <p className={`${styles.orderStatus} `}>Status</p>
                              <p className={`${styles.orderTotal} `}>Total: {order.totalAmountAfterDisc}</p>
                              </div>
                              

                            </div>
                          </div>
                          

                        )}

                      </div>


                      <div className="tab-pane fade" id="pills-brand" role="tabpanel" aria-labelledby="pills-brand-tab" tabIndex="0">

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

            </>
          )}
        </div>
      </Box>
    </>
  )
}
