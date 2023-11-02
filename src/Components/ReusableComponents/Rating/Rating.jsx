import React from "react";
import styles from './Rating.module.css'
const Rating = ({ rate,section }) => {

    let golden = []
    for (var i = 0; i < rate; i++) {
        golden.push(<i className={`fa-solid fa-star ${styles.colorStar}`} key={i}></i>)
    }
    let white = []
    for (var j = 0; j < (5 - rate); j++) {
        white.push(<i className={`fa-regular fa-star ${styles.colorStar}`} key={j}></i>)
    }

    return (
        <>
{section==="profile"?<>
<div data-testid='rate' className={styles.fontSize}> {golden}{white}</div>
</>:
<>
<div data-testid='rate'> {golden}{white}</div>
</>}
        </>
    );
}

export default Rating;