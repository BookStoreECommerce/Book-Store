import React from "react";
import { Link } from 'react-router-dom';
import Rating from "../Rating/Rating";
import styles from './BookCard.module.css'
import bookImage from '../../../assets/book.jpg'

const BookCard = ({ id, image, name, price, author, rate, section, cardStyle ,sale,category}) => {
    return (
        <>
            <div data-testid='BookCard' className={section === "newBooks" ? `col-lg-3 col-sm-6 col-12 mt-5 mb-3 ${styles.font}` : section === 'catBook'? `col-xl-3 col-lg-4 col-sm-6 col-12 mt-5 mb-3 ${styles.font}` :''}>
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
                            <Link to='cart' className="text-decoration-none" >
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
               {section === "bestSeller" || section === "newBooks"?<img src={image? image:bookImage} className={`w-100 ${styles.cardImgNew}`} alt="" />:
               <img src={image? image:bookImage} className={`w-100 ${styles.cardImg}`} alt="" />
               }
                    
                  {section === 'bestSeller' && sale ?<>
                  <div className={`position-absolute ${styles.priceSeller}`}>
                        <span>{sale}% OFF</span>
                    </div>
                  </>:''}

                </div>
                <div className={`d-flex flex-column justify-content-start text-center align-items-center`} >
      
                    {section === "bestSeller" ? '' : <span className={styles.badge}>{category}</span>}
                    {section === "bestSeller" ? '' : <span className={`${styles.bookName} ${styles.textLength}`}>{name}</span>}
                    {section === "bestSeller" ? '' : <span className={styles.bookAuthor}>By {author}</span>}
                    {section === "bestSeller" ? '' : <span className={styles.price}> {price + ` EGP`} </span>}
                  
                </div>
            </div>

        </>
    );
}

export default BookCard;