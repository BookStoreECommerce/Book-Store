import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./BestSeller.module.css";
import BookCard from "../../../Components/ReusableComponents/BookCard/BookCard";
import { useDispatch, useSelector } from "react-redux";
import { getBestSellerData } from "../../../Redux/Slicies/BestSeller/bestSellerSlice.js";

const BestSeller = () => {
  const dispatch = useDispatch();
  const { bestSeller } = useSelector(({ bestSeller }) => bestSeller);
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    speed: 500,
    centerPadding: "60px",
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,

    responsive: [
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    dispatch(getBestSellerData());
  }, []);
  return (
    <section className="px-lg-0 px-4" data-testid="BestSeller">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <h2 className="blueHeader text-center my-md-5 my-3">Best Seller</h2>
          <div className={`col-lg-11 ${styles.marginBottom}`}>
            <Slider {...settings}>
              {bestSeller?.map((bestSeller, index) => (
                <BookCard
                cardStyle={{ margin: "10px", padding: "14px", minHeight:"300px", maxHeight:"300px", display:"flex", justifyContent:"center" ,alignItems:"center"}}
                  key={bestSeller.id}
                  image={bestSeller.image}
                  name={bestSeller.name}
                  price={bestSeller.price}
                  author={bestSeller.author}
                  category={bestSeller.category}
                  rate={bestSeller.rating}
                  sale={bestSeller.sale}
                  slug={bestSeller.slug}
                  section={"bestSeller"}
                  sectionName="whislist"
                  id={bestSeller.id}
                  book={bestSeller}
                />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
