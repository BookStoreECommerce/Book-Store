import React from "react";

import styles from './BookCard.module.css'


const BookCard = ({image, name , price}) => {

    return ( 
<>
    <div className="col-lg-2 col-md-4 col-xs-1 text-center">
        <div className={`mb-2 position-relative`}> 
            <img src= {image} className={`w-100 ${styles.cardImg}`}   alt="" />
        </div>
        <div className="d-flex flex-column">
        <span className={styles.bookName}>{name.slice(0,11)+ '...'}</span>
        <span className={styles.price}>{price + ` EGP`}</span>
        </div>
     
    </div>

</>
     );
}
 
export default BookCard;