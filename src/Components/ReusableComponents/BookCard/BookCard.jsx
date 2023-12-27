import React from "react";
import { Link } from "react-router-dom";
import styles from "./BookCard.module.css";
import bookImage from "../../../assets/book.jpg";

import WishListButton from "../WishListButton/WishListButton";
import Rating from "../Rating/Rating";
import AddCart from "../../Cart/AddCart";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

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
            <div className={styles.bestSellerCard}>
              {section === "bestSeller" && (
                <>
                  <p className={styles.headerFont}>
                    {book?.name.slice(0, 12)}...
                  </p>
                  <p>{author}</p>
                </>
              )}
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Link
                  to={`/book/${slug}`}
                  className="text-decoration-none me-2"
                >
                  <span className={styles.icon}>
                    <i className="fa-regular fa-eye"></i>
                  </span>
                </Link>
                <AddCart id={book?._id} book={book ? book : ""} />
              </Box>
            </div>
          </div>
          <img
            src={image?.secure_url ? image?.secure_url : bookImage}
            className={`w-100 ${styles.cardImgNew}`}
            alt=""
          />

          {section === "bestSeller" && sale && (
            <>
              <div className={`position-absolute ${styles.priceSeller}`}>
                <span>{sale}% OFF</span>
              </div>
            </>
          )}
        </div>
        <div
          className={`d-flex flex-column justify-content-start ${styles.paddingParagraph}`}
        >
          {!(section === "bestSeller" ||
          sectionName === "whislist" ||
          section === "catBook" ||
          sectionName === "Books") && (
            <span className={styles.badge}>{category?.name}</span>
          )}
          {section !== "bestSeller" && (
            <>
              <span className={`${styles.bookName} ${styles.textLength}`}>
                {name}
              </span>
              <span className={styles.bookAuthor}>By {author}</span>

              <span className={styles.price}>
                {(bookPrice || price) + ` EGP`}
              </span>
              {/* {outOfStock && <span className={`${styles.outOfStock} text-white text-center`}>out of stock</span>} */}
              {(sectionName === "whislist" ||
                section === "catBook" ||
                sectionName === "Books") && (
                <>
                  <span className={styles.badge}>{category?.name}</span>
                </>
              )}

              <div className="d-flex justifiy-content-center align-items-center">
                <span className={styles.rate}>
                  <Rating rate={rate} />
                </span>
                <WishListButton bookId={id} />
              </div>
            </>
          )}
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
