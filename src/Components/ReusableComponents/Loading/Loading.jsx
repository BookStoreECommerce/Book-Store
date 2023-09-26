import React from "react";
import styles from './Loading.module.css';

const Loading = () => {
    return ( 
        <div className={styles.body}>
         <div className={styles.book} data-testid='Loading'>
        <div className={styles.Loading}>
          <div className={styles.left}></div>
          <div className={styles.middle}></div>
          <div className={styles.right}></div>
        </div>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        </div>
        </div>
     );
}
 
export default Loading;