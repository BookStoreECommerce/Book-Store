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
          <span className={styles.slug}>Shopping Cart</span>
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
            {ordersArray?.length >= 0 || pdfBooksArray?.length >=0 ? (
              <>
                
              <ul className="nav nav-pills mb-3 justify-content-center" id="pills-tab" role="tablist">
              <li className="nav-item" role="presentation">
                <button className="nav-link active" id="pills-all-tab" data-bs-toggle="pill" data-bs-target="#pills-all"
                  type="button" role="tab" aria-controls="pills-all" aria-selected="true">Books</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" id="pills-brand-tab" data-bs-toggle="pill" data-bs-target="#pills-brand"
                  type="button" role="tab" aria-controls="pills-brand" aria-selected="false">PDF</button>
              </li>
        
    
            </ul>

            <div className="tab-content" id="pills-tabContent">
              <div className="tab-pane fade show active" id="pills-all" role="tabpanel" aria-labelledby="pills-all-tab"
                tabIndex="0">
               
                {ordersArray?.map((order, index) => 
                  
                  <div className={` col-lg-7 col-md-8 col-sm-10 col-10`}
                  key={index} >
                  <div
                    className={`row justify-content-between`}
                  >
                  {order.books?.map((orderBook,id)=>
                    <>
                    <p key={id}> {orderBook.book.name}</p>
                    
                    </>
                 
               
                  //  console.log(orderBook.book.name);
                   
                  )}
                   
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
