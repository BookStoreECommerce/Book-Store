import React, { useEffect, useState } from "react";
import styles from './Categories.module.css';
import CategoryCard from "../CategoryCard/CategoryCard";
import music from '../../../assets/music.jpg'
import architure from '../../../assets/arc.jpg';
import science from '../../../assets/sciencee.jpg';
import cooking from '../../../assets/cooking.jpg';
import scienceFiction from '../../../assets/sci-fiction.jpg';
import children from '../../../assets/children.jpg';
import business from '../../../assets/business.jpg';
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Categories = () => {


    useEffect(() => {
        AOS.init();
        window.addEventListener('load', AOS.refresh);
   
    }, []);

    const [category] = useState([
        {
            catName: "Science",
            img: science
        },
        {
            catName: "Children",
            img: children
        },
        {
            catName: "Cooking",
            img: cooking
        },
        {
            catName: "Science Fiction",
            img: scienceFiction
        },
        {
            catName: "Business",
            img: business
        },
        {
            catName: "Music",
            img: music
        },
        {
            catName: "Architecture",
            img: architure
        },
    ])

    const shuffle = (array) => {
        // console.log(array.length);
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };
    const shuffledArray = shuffle(category).slice(0, 6);

    return (
        <>
            <section className='pt-4 pb-5' data-testid='Categories'>
                <div className={`container text-center ${styles.paddingSection}`}>
                    <h2 className="blueHeader">Categories</h2>
                    <div className="row justifiy-content-center align-items-center gy-4 mt-4" data-testid='CategoryCard'>
                        <div className="col-lg-12 col-md-12" data-aos="fade-up" data-aos-duration="800">

                            <div className="row gy-4">
                                {
                                    shuffledArray.map((singleCat,index) =>

                                        <CategoryCard sectionName="home" key={index} catName={singleCat.catName} img={singleCat.img} />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Link to='categories' className="text-decoration-none"><p className={styles.fontpargraph}>See All Categories...</p></Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Categories;