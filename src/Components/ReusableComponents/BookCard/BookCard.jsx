import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./BookCard.module.css";
import bookImage from "../../../assets/book.jpg";
import { useDispatch, useSelector } from "react-redux";
import { handleClickOpen } from "../../../Redux/Slicies/dialogSlice";
import { getWhishList } from "../../../Redux/Slicies/whishlistActions";
import { getUserProfile } from "../../../Redux/Slicies/authActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const BookCard = ({ book, id, image, name, price, author, section, cardStyle, sale, category, slug, sectionName, }) => {

  const [filled, setFilled] = useState(false)
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { whishlist } = useSelector((state) => state.whishlist);
  localStorage.setItem('whishList', JSON.stringify(whishlist));

  const WhishList = async (bookId) => {
    await dispatch(getWhishList(bookId))
    await dispatch(getUserProfile())

    let arr = JSON.parse(localStorage.getItem('whishList'))
    if (arr.includes(bookId)) {
      setFilled(true)
      toast.success('Add To WishList!', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        
      });
    } else {
      setFilled(false)
      toast.error("Remove from wishlist!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  useEffect(() => {
    let arr = JSON.parse(localStorage.getItem('whishList'))

    if (arr.includes(id)) {
      setFilled(true)
    } else {
      setFilled(false)
    }
  }, [filled])
  const token = localStorage.getItem('access-token');
  return (
    <>
      <div data-testid="BookCard" className={section === "newBooks" ? `col-lg-3 col-sm-6 col-12 mt-5 mb-3 ${styles.font}` : section === "catBook" ? `col-xl-3 col-lg-4 col-sm-6 col-12 mt-5 mb-3 ${styles.font}` : ""}>
        <div className={`mb-2 position-relative ${styles.imgContainer}`} style={cardStyle}>
          <div className={styles.overLay}>
            {section !== "bestSeller" ? (
              <>
                <Link to={`/book/${slug}`} className="text-decoration-none">
                  <span className={styles.icon}>
                    <i className="fa-regular fa-eye"></i>
                  </span>
                </Link>

                <Link to="cart" className="text-decoration-none">
                  <span className={styles.icon}>
                    <i className="fa-solid fa-cart-shopping"></i>
                  </span>
                </Link>
              </>
            ) : (
              <>
                <div className={styles.bestSellerCard}>
                  <p className={styles.headerFont}>{book?.name.slice(0, 12)}...</p>
                  <p>{author}</p>
                </div>
              </>
            )}
          </div>
          {section === "bestSeller" ? (
            <img src={book?.image?.secure_url ? book?.image?.secure_url : image ? image : bookImage} className={`w-100 ${styles.cardImgNew}`} alt="" />
          ) : (
            <img src={book?.image?.secure_url ? book?.image?.secure_url : image ? image : bookImage} className={`w-100 ${styles.cardImg}`} alt="" />
          )}

          {section === "bestSeller" && sale ?
            <>
              <div className={`position-absolute ${styles.priceSeller}`}>
                <span>{sale}% OFF</span>
              </div>
            </> : ""}
        </div>
        <div
          className={`d-flex flex-column justify-content-start ${styles.paddingParagraph}`}
        >
          {section === "bestSeller" || sectionName === "whislist" || section === "catBook" || sectionName === "Books" ?
            "" : <span className={styles.badge}>{category?.name}</span>
          }
          {section === "bestSeller" ? "" :
            <span className={`${styles.bookName} ${styles.textLength}`}>{name}</span>
          }
          {section === "bestSeller" ? "" :
            <span className={styles.bookAuthor}>By {author}</span>
          }
          {section === "bestSeller" ? "" :
            <span className={styles.price}> {price + ` EGP`} </span>
          }
          {section === "bestSeller" ? "" :
            <>
              <div className="d-flex justifiy-content-center align-items-center">
                {sectionName === "whislist" || section === "catBook" || sectionName === "Books" ? <><span className={styles.badge}>{category?.name}</span></> : ""}
                {user !== null && token !== null ? <>
                  <button className={`text-decoration-none btn ms-auto ${styles.btn}`} onClick={() => WhishList(id)}>

                    <span className={styles.whishlisticon}>
                      <i className={filled ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                    </span>
                  </button>
                  <ToastContainer position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light" />
                </> :
                  <>
                    <button className={`text-decoration-none btn ms-auto ${styles.btn}`} onClick={() => {
                      dispatch(handleClickOpen({ name: "login" }));
                    }}>
                      <span className={styles.whishlisticon}>
                        <i className="fa-regular fa-heart"></i>
                      </span>
                    </button>
                  </>}
              </div>
            </>}
        </div>
      </div>
    </>
  );
};

export default BookCard;
