import React, { useEffect } from "react";
import styles from './CategoryCard.module.css'
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";


const CategoryCard = ({ shuffledArray }) => {

    useEffect(() => {
        AOS.init();
        window.addEventListener('load', AOS.refresh);
    }, []);

    return (
        <>
            <div className="row justifiy-content-center align-items-center gy-4 mt-4" data-testid='CategoryCard'>
                <div className="col-lg-12 col-md-12" data-aos="fade-up" data-aos-duration="800">

                    <div className="row gy-4">
                        {shuffledArray.map((ele, index) => 
                        <Link key={index} to={`books/${ele.slug}`} className="col-lg-4 col-md-6 col-sm-6" >
                            <div className={`${styles.imgCat} ${styles.fontSize} position-relative`}>
                                <div className={`${styles.overlayCat}`}>
                                    <p>{ele.catName}</p>
                                </div>
                                <img className="w-100 rounded-4" src={ele.img} alt='' loading="lazy" />
                            </div>
                        </Link>
                        )}
                    </div>
                </div>

            </div>
        </>
    );
}

export default CategoryCard;