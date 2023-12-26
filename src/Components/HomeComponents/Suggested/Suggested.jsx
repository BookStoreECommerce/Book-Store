import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Suggested.module.css";
import BookCard from "../../ReusableComponents/BookCard/BookCard";
import { useSelector } from "react-redux";

const Suggested = () => {
  const { suggestedBooks } = useSelector((state) => state.auth);
  const Suggested = suggestedBooks.map((ele) => {
    return {
      _id: ele._id,
      image: ele.image,
      name: ele.name,
      slug: ele.slug,
      author: ele.author,
      price: ele.price,
      sale: ele.discount,
      category: ele.category,
      rating: ele.rating,
      variations: ele.variations,
    };
  });

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

  return (
    <>
      {Suggested.length !== 0 && (
        <section className="Suggested px-lg-0 px-4" data-testid="Suggested">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <h2 className="blueHeader text-center my-md-5 my-3">
                Books You May Like
              </h2>
              <div className={`col-lg-11 ${styles.marginBottom}`}>
                <Slider {...settings}>
                  {Suggested.map((Suggested, index) => {
                    return (
                      <BookCard
                        cardStyle={{
                          margin: "10px",
                          padding: "10px",
                          minHeight: "300px",
                          maxHeight: "300px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        key={Suggested._id}
                        image={Suggested.image}
                        name={Suggested.name}
                        price={Suggested.price}
                        author={Suggested.author}
                        rate={Suggested.rating}
                        sale={Suggested.sale}
                        section="Suggested"
                        slug={Suggested.slug}
                      reviews={Suggested.reviews}

                        category={Suggested.category}
                        sectionName="whislist"
                        id={Suggested._id}
                        book={Suggested}
                      />
                    );
                  })}
                </Slider>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Suggested;
