import React  from "react";
import styles from './CategoryCard.module.css'


const CategoryCard = ({ shuffledArray }) => {



    return (
        <>
            <div className="row justifiy-content-center align-items-center gy-4 mt-4" >
                <div className="col-lg-6 col-md-12">

                    <div className="row gy-4 "  >
                        <div className="col-md-6 col-sm-6" >
                            <div className={`${styles.imgCat} ${styles.fontSize} position-relative`}>
                                <div className={`${styles.overlayCat}`}>
                                    <p>{shuffledArray[0].catName}</p>
                                </div>
                                <img className="w-100 rounded-4" src={shuffledArray[0].img} alt='' />
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6" >
                            <div className={`${styles.imgCat} ${styles.fontSize} position-relative`}>
                                <div className={`${styles.overlayCat} `}>
                                    <p>{shuffledArray[1].catName}</p>
                                </div>
                                <img className="w-100 rounded-4" src={shuffledArray[1].img} alt='' />
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <div className={`${styles.imgCat} ${styles.fontSize} position-relative`}>
                                <div className={`${styles.overlayCat} `}>
                                    <p>{shuffledArray[3].catName}</p>
                                </div>
                                <img className="w-100 rounded-4" src={shuffledArray[3].img} alt='' />
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <div className={`${styles.imgCat} ${styles.fontSize} position-relative`}>
                                <div className={`${styles.overlayCat} `}>
                                    <p>{shuffledArray[4].catName}</p>
                                </div>
                                <img className="w-100 " src={shuffledArray[4].img} alt='' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`col-lg-6 col-md-12  `}>

                    <div className={`${styles.imgCat} position-relative`}>
                        <div className={`${styles.overlayCat} `}>
                            <p>{shuffledArray[2].catName}</p>
                        </div>
                        <img className="w-100 rounded-4" src={shuffledArray[2].img} alt='' />
                    </div>
                </div>
            </div>
        </>
    );
}

export default CategoryCard;