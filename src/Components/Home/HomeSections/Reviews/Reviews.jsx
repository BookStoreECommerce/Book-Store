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
        autoplaySpeed: 8000,
        cssEase: "linear",
        arrows: false,
    };
    const [review, setReview] = useState([
        {
            id:0,
            rate: 4,
            review: "All good books have one thing in common - they are truer than if they had really happened.",
            name: "Ernest Hemingway"
        },
        {
            id:1,
            rate: 5,
            review: "All good books have one thing in common - they are truer than if they had really happened.",
            name: "Ernest Hemingway"
        },
        {
            id:2,
            rate: 3,
            review: "All good books have one thing in common - they are truer than if they had really happened.",
            name: "Ernest Hemingway"
        }
        ,
        {
            id:3,
            rate: 2,
            review: "All good books have one thing in common - they are truer than if they had really happened.",
            name: "Ernest Hemingway"
        },
        ,
        {
            id:4,
            rate: 2,
            review: "All good books have one thing in common - they are truer than if they had really happened.",
            name: "Ernest Hemingway"
        },
        ,
        {
            id:5,
            rate: 5,
            review: "All good books have one thing in common - they are truer than if they had really happened.",
            name: "Ernest Hemingway"
        },
        ,
        {
            id:6,
            rate: 2,
            review: "All good books have one thing in common - they are truer than if they had really happened.",
            name: "Ernest Hemingway"
        },
        ,
        {
            id:7,
            rate: 4,
            review: "All good books have one thing in common - they are truer than if they had really happened.",
            name: "Ernest Hemingway"
        },
        ,
        {
            id:8,
            rate: 5,
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
                            {review.map((review) =>{
                            if( review.rate >= 4){
                                return(
                                    <div className={style.reviewContent} key={review.id}>
                                    <Rating rate={review.rate}/>
                                    <p className={`my-2 ${style.fontParg}`}>❝ {review.review} ❞</p>
                                    <p className={`mb-2 ${style.fontname}`}>{review.name}</p>
                                </div>
                                )
                              
                            }
                        } 
                            )}
                        </Slider>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}

export default Reviews;