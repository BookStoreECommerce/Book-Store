import React from "react";
import { Link } from 'react-router-dom';
import Rating from "../Rating/Rating";
import styles from './BookCard.module.css'


const BookCard = ({ id, image, name, price, author, rate, section, cardStyle ,sale}) => {
    return (
        <>
            <div className={section == "newBooks" ? `col-lg-3 col-sm-6 col-12 mb-2 ${styles.font}` : ''}>
                <div className={`mb-2 position-relative ${styles.imgContainer}`} style={cardStyle}>
                    <div className={styles.overLay}>

                        {section !== 'bestSeller' ? <>
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
                        </> : <>
                            <div className={styles.bestSellerCard}>
                                <p className={styles.headerFont}>{name.slice(0,12)}...</p>
                                <p>{author}</p>
                                <Rating rate={rate} id={id} />
                            </div>
                        </>
                        }

                    </div>

                    <img src={image} className={`w-100 ${styles.cardImg}`} alt="" />
                  {section === 'bestSeller' && sale ?<>
                  <div className={`position-absolute ${styles.priceSeller}`}>
                        <span>{sale}% OFF</span>
                    </div>
                  </>:''}

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