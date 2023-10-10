import React from "react";
import styles from './Categories.module.css';
import CategoryCard from "../CategoryCard/CategoryCard";
import { Link } from "react-router-dom";
import {  useSelector } from "react-redux";

const Categories = () => {
    const { user } = useSelector((state) => state.auth);

    const { getCategoriesResult } = useSelector(
        (state) => state.favourites
    );

    const formatAllCat = getCategoriesResult.map((ele) => {return {"catName": ele.name, "img": ele.image.secure_url}}); 

    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };
    const shuffledArray = shuffle(formatAllCat);

    const userFavCat = user.fav_cats.map((ele) => {return {"catName": ele.name, "img": ele.image.secure_url}});

    const names = new Set(userFavCat.map(({ catName }) => catName));
    const catNotRepeated = shuffledArray.filter(({ catName }) => !names.has(catName));

    userFavCat.map((ele) => {return catNotRepeated.unshift(ele)});
    const displayedCat = catNotRepeated.slice(0, 6);

    return (
        <>
            <section className='pt-4 pb-5' data-testid='Categories'>
                <div className={`container text-center ${styles.paddingSection}`}>
                    <h2 className="blueHeader">Categories</h2>
                  <CategoryCard shuffledArray={displayedCat} />
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