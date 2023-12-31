import React from "react";
import { Link } from "react-router-dom";
import styles from "./BookCard.module.css";

import WishListButton from "../WishListButton/WishListButton";
import Rating from "../Rating/Rating";
import AddCart from "../../Cart/AddCart";
import { useSelector } from "react-redux";

const BookCard = ({
  book,
  id,
  image,
  name,
  price,
  author,
  section,
  cardStyle,
  sale,
  category,
  slug,
  sectionName,
  rate,
  reviews,
}) => {
  const { filterRadioBtns } = useSelector((state) => state.booksFilter);
  let bookPrice;
  let outOfStock = false;

  if (section === "AllBooks") {
    book.variations.forEach((ele) => {
      if (
        ele.variation_name === Object.keys(filterRadioBtns)[0] &&
        filterRadioBtns[Object.keys(filterRadioBtns)[0]]
      ) {
        bookPrice = ele.variation_price;
      }

      if (
        ele.variation_name === "hardcover" &&
        ele.variation_is_available === false &&
        (Object.keys(filterRadioBtns)[0] === "hardcover" ||
          filterRadioBtns[Object.keys(filterRadioBtns)[0]])
      ) {
        outOfStock = true;
      }
      if (
        Object.keys(filterRadioBtns)[0] !== "hardcover" ||
        !filterRadioBtns[Object.keys(filterRadioBtns)[0]]
      ) {
        outOfStock = false;
      }
    });
  }

  return (
    <>
      <div
        data-testid="BookCard"
        className={
          section === "newBooks" || section === "lastSearch"
            ? `col-md-3 col-sm-4 col-6 mt-5 mb-3 ${styles.font}`
            : section === "catBook"
            ? `col-xl-3 col-lg-4 col-sm-6 col-12 mt-5 mb-3 ${styles.font}`
            : ""
        }
      >
        <div
          className={
            sectionName === "whislist"
              ? `mb-2 position-relative ${styles.imgContainer} ${styles.height}`
              : section === "AllBooks"
              ? `mb-2 position-relative ${styles.imgContainerBooks}`
              : section === "lastSearch"
              ? `mb-2 position-relative ${styles.imgContainerLastSearch}`
              : `mb-2 position-relative ${styles.imgContainer} `
          }
          style={cardStyle}
        >
          <div className={styles.overLay}>
            {section !== "bestSeller" ? (
              <>
                <Link to={`/book/${slug}`} className="text-decoration-none">
                  <span className={styles.icon}>
                    <i className="fa-regular fa-eye"></i>
                  </span>
                </Link>

                {/* <Link to="cart" className="text-decoration-none">
                  <span className={styles.icon}>
                    <i className="fa-solid fa-cart-shopping"></i>
                  </span>
                </Link> */}
                <AddCart id={book?._id} book={book ? book : ""} />
              </>
            ) : (
              <>
                <div className={styles.bestSellerCard}>
                  <p className={styles.headerFont}>
                    {book?.name.slice(0, 12)}...
                  </p>
                  <p>{author}</p>
                </div>
              </>
            )}
          </div>
          {sectionName === "whislist" ? (
            <img
              src={image?.secure_url}
              className={`w-100 ${styles.cardStyle}`}
              alt=""
            />
          ) : (
            <img
              src={image?.secure_url}
              className={`w-100 ${styles.cardImg}`}
              alt=""
            />
          )}
        </div>
        <div
          className={`d-flex flex-column justify-content-start ${styles.paddingParagraph}`}
        >
          {sectionName === "whislist" ||
          section === "catBook" ||
          sectionName === "Books" ? (
            ""
          ) : (
            <span className={styles.badge}>{category?.name}</span>
          )}
          <>
            <span className={`${styles.bookName} ${styles.textLength}`}>
              {name}
            </span>
            <span className={styles.bookAuthor}>By {author}</span>

            <span className={styles.price}>
              {(bookPrice || price) + ` EGP`}
            </span>
            {sectionName === "whislist" ||
            section === "catBook" ||
            sectionName === "Books" ? (
              <>
                <span className={styles.badge}>{category?.name}</span>
              </>
            ) : (
              ""
            )}

            <div className="d-flex justifiy-content-center align-items-center">
              <span className={styles.rate}>
                {" "}
                <Rating rate={rate} />{" "}
              </span>
              <WishListButton bookId={id} />
            </div>
          </>
        </div>
        {outOfStock && (
          <span className={`${styles.outOfStock} text-white text-center`}>
            out of stock
          </span>
        )}
      </div>
    </>
  );
};

export default BookCard;
