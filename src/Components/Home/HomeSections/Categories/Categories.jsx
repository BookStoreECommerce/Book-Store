import React, { useState } from "react";
import styles from './Categories.module.css';
import CategoryCard from "../CategoryCard/CategoryCard";
import music from '../../../../assets/music.jpg'
import architure from '../../../../assets/arc.jpg';
import science from '../../../../assets/sciencee.jpg';
import cooking from '../../../../assets/cooking.jpg';
import scienceFiction from '../../../../assets/sci-fiction.jpg';
import children from '../../../../assets/children.jpg';
import business from '../../../../assets/business.jpg';



const Categories = () => {

    
    const [category, setCategory] = useState([
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
                  <CategoryCard shuffledArray={shuffledArray} />
                </div>
            </section>
        </>
    );
}

export default Categories;