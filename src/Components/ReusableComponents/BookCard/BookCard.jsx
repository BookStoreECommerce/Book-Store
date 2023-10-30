import React from "react";
import { Link } from "react-router-dom";
import styles from "./BookCard.module.css";
import bookImage from "../../../assets/book.jpg";

import WishListButton from "../WishListButton/WishListButton";
import Rating from "../Rating/Rating";


const BookCard = ({ book, id, image, name, price, author, section, cardStyle, sale, category, slug, sectionName, rate }) => {
// console.log(rate);
  return (
    <>
      <div data-testid="BookCard" className={section === "newBooks" ? `col-lg-3 col-sm-6 col-12 mt-5 mb-3 ${styles.font}` : section === "catBook" ? `col-xl-3 col-lg-4 col-sm-6 col-12 mt-5 mb-3 ${styles.font}` : ""}>
        <div className={sectionName === "whislist" ? `mb-2 position-relative ${styles.imgContainer} ${styles.height}` : `mb-2 position-relative ${styles.imgContainer} `} style={cardStyle}>
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
          ) :
            sectionName === "whislist" ?
              (
                <img src={book?.image?.secure_url ? book?.image?.secure_url : image ? image : bookImage} className={`w-100 ${styles.cardStyle}`} alt="" />
              )
              :
              (
                <img src={book?.image?.secure_url ? book?.image?.secure_url : image ? image : bookImage} className={`w-100 ${styles.cardImg}`} alt="" />
              )
          }

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
            <>
              <span className={`${styles.bookName} ${styles.textLength}`}>{name}</span>
              <span className={styles.bookAuthor}>By {author}</span>
              <span className={styles.price}> {price + ` EGP`} </span>
              {sectionName === "whislist" || section === "catBook" || sectionName === "Books" ? <><span className={styles.badge}>{category?.name}</span></> : ""}
        
              <div className="d-flex justifiy-content-center align-items-center">
              <span className={styles.rate}> <Rating rate={rate}/> </span>
                <WishListButton bookId={id} />
              </div>

            </>
          }

        </div>
      </div>
    </>
  );
};

export default BookCard;
