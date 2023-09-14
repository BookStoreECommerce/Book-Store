import React, { Fragment, useState } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from './Reviews.module.css'
import Rating from "../../../ReusableComponents/Rating/Rating";


const Reviews = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear"
    };
    const [review, setReview] = useState([
        {
            rate: 4,
            review: "All good books have one thing in common - they are truer than if they had really happened.",
            name: "Ernest Hemingway"
        },
        {
            rate: 5,
            review: "All good books have one thing in common - they are truer than if they had really happened.",
            name: "Ernest Hemingway"
        },
        {
            rate: 3,
            review: "All good books have one thing in common - they are truer than if they had really happened.",
            name: "Ernest Hemingway"
        },
        {
            rate: 2,
            review: "All good books have one thing in common - they are truer than if they had really happened.",
            name: "Ernest Hemingway"
        },

    ])

    return (

        <Fragment>
            <section>
                <div className="container">
                    <div>
                        <Slider {...settings}>
                            {review.map((review) =>
                                <div className={style.reviewContent}>
                                    <Rating rate={review.rate}/>
                                    <p className={`my-2 ${style.fontParg}`}>❝ {review.review} ❞</p>
                                    <p className={`mb-2 ${style.fontname}`}>{review.name}</p>
                                </div>
                            )}
                        </Slider>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}

export default Reviews;