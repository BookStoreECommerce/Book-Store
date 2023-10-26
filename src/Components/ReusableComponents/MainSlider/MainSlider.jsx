import React from 'react'
import Slider from 'react-slick';
import BookCard from '../BookCard/BookCard.jsx';

export default function MainSlider({arr, title,autoplay= true}) {
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        speed: 500,
        centerPadding: "60px",
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay,
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
        <section className="px-lg-0 px-4 " data-testid="BestSeller">
          <div className="container-fluid" >
            <div className="row justify-content-center">
              <h2 className="blueHeader text-center mt-4 mb-5">{title}</h2>
              <div className={`col-lg-11 mb-5`}>
                <Slider {...settings}>
                  {arr?.map((book, index) => (
                    <BookCard
                      cardStyle={{ margin: "10px", padding: "14px", minHeight:"300px", maxHeight:"300px", display:"flex", justifyContent:"center" ,alignItems:"center"}}
                      key={book._id}
                      image={book.image.secure_url }
                      id={book._id}
                      name={book.name}
                      price={book.price}
                      author={book.author}
                      rate={book.rate}
                      sale={book.sale}
                      section={title}
                      book={book}
                      slug={book.slug}
                      category={book.category}
                      sectionName="whislist"
                    />
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </section>
      );
}
