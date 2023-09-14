import React, { Fragment, useState } from "react";

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import profile1 from '../../../../assets/profile1.jpg'
import profile2 from '../../../../assets/profile2.jpg'
import profile3 from '../../../../assets/profile3.jpg'
import profile4 from '../../../../assets/profile4.jpg'
import style from './Reviews.module.css'


const Reviews = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    const [review, setReview] = useState([
        {
            profileImage: profile1,
            rate: 4,
            review: "All good books have one thing in common - they are truer than if they had really happened.",
            name: "Ernest Hemingway"
        },
        {
            profileImage: profile2,
            rate: 5,
            review: "All good books have one thing in common - they are truer than if they had really happened.",
            name: "Ernest Hemingway"
        },
        {
            profileImage: profile3,
            rate: 3,
            review: "All good books have one thing in common - they are truer than if they had really happened.",
            name: "Ernest Hemingway"
        },
        {
            profileImage: profile4,
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
                                <div className="d-flex justify-content-center mb-3">
                                <div className={style.reviewImage}>
                                        <img src={review.profileImage} className={`${style.imageStyle} w-100`} />
                                    </div>
                                
                                </div>
                                    
                                    <p className={`mb-2 ${style.fontParg}`}>❝ {review.review} ❞</p>
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