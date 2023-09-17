import React from "react";
import { Link } from 'react-router-dom';
import Rating from "../Rating/Rating";
import styles from './BookCard.module.css'


const BookCard = ({ id, image, name, price, author, rate, section }) => {
    return (
        <>
            <div className={`col-lg-3 col-md-6 col-xs-12 ${styles.font}`}>
                <div className={`mb-2 position-relative ${styles.imgContainer}`}>
                    <div className={styles.overLay}>

                        <Link to='detailsBook' className="text-decoration-none">
                            <span className={styles.icon}>
                                <i className="fa-regular fa-eye"></i>
                            </span>
                        </Link>
                        <Link to='favorite' className="text-decoration-none">
                            <span className={styles.icon}>
                                <i className="fa-solid fa-heart "></i>
                            </span>
                        </Link>
                        <Link to='cart' className="text-decoration-none">
                            <span className={styles.icon}>
                                <i className="fa-solid fa-cart-shopping"></i>
                            </span>
                        </Link>

                    </div>
                    <img src={image} className={`w-100 ${styles.cardImg}`} alt="" />
                </div>
                <div className={`d-flex flex-column justify-content-start text-left ${styles.pLeft}`} >
                    {section === "bestSeller" ? '' : <span className={styles.bookName}>{name}</span>}
                    {section === "bestSeller" ? '' : <span className={styles.bookAuthor}>By {author}</span>}
                    {section === "bestSeller" ? '' : <span className={styles.price}> {price + ` EGP`} </span>}
                    {section === "bestSeller" ? '' : <><Rating rate={rate} id={id} /></>}
                </div>
            </div>

        </>
    );
}

export default BookCard;