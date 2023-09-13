import React from "react";

import styles from './BookCard.module.css'


const BookCard = ({image, name , price , section}) => {
    return ( 
<>
    <div className="col-lg-3 col-md-4 col-xs-1 text-center">
        <div className={`mb-2 position-relative ${styles.imgContainer}`}> 
            <img src= {image} className={`w-100 ${styles.cardImg}`}   alt="" />
        </div>
        <div className="d-flex flex-column">
            {section === "bestSeller"?'':<span className={styles.bookName}>{name.slice(0,11)+ '...'}</span>}
            {section === "bestSeller"?'': <span className={styles.price}> {price + ` EGP`} </span>}
        </div>
     
    </div>

</>
     );
}
 
export default BookCard;