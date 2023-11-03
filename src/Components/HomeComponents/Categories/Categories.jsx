import React, { useEffect } from "react";
import styles from './Categories.module.css';
import CategoryCard from "../CategoryCard/CategoryCard";
import { Link } from "react-router-dom";
import {  useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";

const Categories = () => {
    const { user } = useSelector((state) => state.auth);

    const { getCategoriesResult } = useSelector(
        (state) => state.favourites
    );

    const formatAllCat = getCategoriesResult.map((ele) => {return {"catName": ele.name, "img": ele.image.secure_url, "slug": ele.slug}}); 

    useEffect(() => {
        AOS.init();
        window.addEventListener('load', AOS.refresh);
   
    }, []);

    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };
    const shuffledArray = shuffle(formatAllCat);

    const userFavCat = user?user.fav_cats.map((ele) => {return {"catName": ele.name, "img": ele.image.secure_url, "slug": ele.slug}}) : [];
    const names = new Set(userFavCat.map(({ catName }) => catName));
    const shuffledArraForUser = [...shuffledArray];
    const catNotRepeated = shuffledArraForUser.filter(({ catName }) => !names.has(catName));

    userFavCat.map((ele) => {return catNotRepeated.unshift(ele)});
    const displayedCat = user? catNotRepeated.slice(0, 6) : shuffledArray.slice(0, 6);

    return (
        <>
            <section data-testid='Categories'>
                <div className={`container text-center ${styles.paddingSection}`}>
                    <h2 className="blueHeader my-md-5 my-3">Categories</h2>
                    <div className="row justifiy-content-center align-items-center gy-4" data-testid='CategoryCard'>
                        <div className="col-lg-12 col-md-12" data-aos="fade-up" data-aos-duration="800">

                            <div className="row gy-4">
                                {
                                    displayedCat.map((singleCat, index) =>
                                        <CategoryCard key={index} sectionName="home" catName={singleCat.catName} img={singleCat.img} slug={singleCat.slug} />
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