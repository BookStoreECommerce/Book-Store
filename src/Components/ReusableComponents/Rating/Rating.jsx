import React from "react";
import styles from './Rating.module.css'
const Rating = ({ rate }) => {

    let golden = []
    for (var i = 0; i < rate; i++) {
        golden.push(<i className={`fa-solid fa-star ${styles.colorStar}`} key={i}></i>)
    }
    let white = []
    for (var j = 0; j < (5 - rate); j++) {
        white.push(<i className={`fa-regular fa-star ${styles.colorStar}`} key={j}></i>)
    }
    // <div> {golden}{white.map((white, index) => <span key={index}>{white}</span>)}</div>

    return (
        <>
            <div> {golden}{white}</div>
        </>
    );
}

export default Rating;