import React from "react";
import styles from './Loading.module.css';

const Loading = ({sectionName}) => {
    return ( 
        <div className={sectionName =='home'?`${styles.body} ${styles.heightBody}`:sectionName == 'profile'?`${styles.body} ${styles.heightProfile}`:sectionName =='AllBooks'?`${styles.body} ${styles.heightAllBooks}`:`${styles.body} ${styles.heightBook}`}>
         <div className={sectionName =='home'?`${styles.book} ${styles.zoomOut}`:sectionName =='profile'?`${styles.book} ${styles.zoomIn}`:`${styles.book} ${styles.zoomIn}`} data-testid='Loading'>
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