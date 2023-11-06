import React, { useState } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './BestSeller.module.css'
import book from  '../../../assets/1.jpg'
import book2 from '../../../assets/2.jpg'
import book3 from '../../../assets/3.jpg'
import book4 from '../../../assets/4.jpg'
import book5 from '../../../assets/5.jpg'
import book6 from '../../../assets/6.jpg'
import book7 from '../../../assets/7.jpg'
import book8 from '../../../assets/8.jpg'
import book9 from '../../../assets/9.jpg'
import book10 from '../../../assets/10.jpg'
import book11 from '../../../assets/11.jpg'
import book12 from '../../../assets/12.jpg'
import BookCard from "../../../Components/ReusableComponents/BookCard/BookCard";

const BestSeller = () => {
    const [bestSeller] = useState([
        {
            id: 0,
            image: book,
            name: "Our World Our Life",
            author: "Lembid Noissa",
            price: 310,
            sale: -5,
        },
        {
            id: 1,
            image: book2,
            name: "Blue In The Water",
            author: "Twent Momens",
            price: 200,

        },
        {
            id: 2,
            image: book3,
            name: "Animals Life",
            author: "Ariean Hason",
            price: 200,

        }
        ,
        {
            id: 3,
            image: book4,
            name: "Memorise",
            author: "Lembid Noissa",
            price: 350,
            sale: -10,
        }
        ,
        {
            id: 4,
            image: book5,
            name: "War Of Dragon",
            author: "Moren Nicol",
            price: 410,
            sale: -25,
        }
        ,
        {
            id: 5,
            image: book6,
            name: "Moon Light Sadow",
            author: "Lebmid Traeh",
            price: 220,

        }
        ,
        {
            id: 6,
            image: book7,
            name: "Oloio",
            author: "Madhu Sashan",
            price: 130,

        }
        ,
        {
            id: 7,
            image: book8,
            name: "Art Of Illustrator",
            author: "Rabiul Vom",
            price: 300,
            sale: -30,
        }
        ,
        {
            id: 8,
            image: book9,
            name: "New World For Children",
            author: "Charise Jemes",
            price: 120,

        }
        ,
        {
            id: 9,
            image: book10,
            name: "War Of Dragon",
            author: "Moren Nicol",
            price: 200,

        }
        ,
        {
            id: 10,
            image: book11,
            name: "Alone Walker",
            author: "Soad Humber",
            price: 75,

        }
        ,
        {
            id: 11,
            image: book12,
            name: "The Hunter House",
            author: 'Rakib Jon',
            price: 100,
            sale: -5,
        }
    ])
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
                }
            },
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (

        <section className="px-lg-0 px-4" data-testid='BestSeller'>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <h2 className="blueHeader text-center my-md-5 my-3">Best Seller</h2>
                    <div className={`col-lg-11 ${styles.marginBottom}`}>
                        <Slider {...settings} >
                            {bestSeller.map((bestSeller, index) =>
                                <BookCard
                                    cardStyle={{ margin: "10px", padding: '0px' }}
                                    key={bestSeller.id}
                                    image={bestSeller.image}
                                    name={bestSeller.name}
                                    price={bestSeller.price}
                                    author={bestSeller.author}
                                    rate={bestSeller.rate}
                                    sale={bestSeller.sale}
                                    section={"bestSeller"}
                                    id={bestSeller.id}
                                    book={bestSeller} />
                            )}
                        </Slider>
                    </div>
                </div>
            </div>
        </section>

    );
}

// import React, { useEffect, useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import styles from "./BestSeller.module.css";
// import book from "../../../assets/1.jpg";
// import book2 from "../../../assets/2.jpg";
// import book3 from "../../../assets/3.jpg";
// import book4 from "../../../assets/4.jpg";
// import book5 from "../../../assets/5.jpg";
// import book6 from "../../../assets/6.jpg";
// import book7 from "../../../assets/7.jpg";
// import book8 from "../../../assets/8.jpg";
// import book9 from "../../../assets/9.jpg";
// import book10 from "../../../assets/10.jpg";
// import book11 from "../../../assets/11.jpg";
// import book12 from "../../../assets/12.jpg";
// import BookCard from "../../../Components/ReusableComponents/BookCard/BookCard";

// const BestSeller = () => {
//   const [bestSeller] = useState([
//     {
//       id: 0,
//       image: book,
//       name: "Our World Our Life",
//       author: "Lembid Noissa",
//       price: 310,
//       sale: -5,
//     },
//     {
//       id: 1,
//       image: book2,
//       name: "Blue In The Water",
//       author: "Twent Momens",
//       price: 200,
//     },
//     {
//       id: 2,
//       image: book3,
//       name: "Animals Life",
//       author: "Ariean Hason",
//       price: 200,
//     },
//     {
//       id: 3,
//       image: book4,
//       name: "Memorise",
//       author: "Lembid Noissa",
//       price: 350,
//       sale: -10,
//     },
//     {
//       id: 4,
//       image: book5,
//       name: "War Of Dragon",
//       author: "Moren Nicol",
//       price: 410,
//       sale: -25,
//     },
//     {
//       id: 5,
//       image: book6,
//       name: "Moon Light Sadow",
//       author: "Lebmid Traeh",
//       price: 220,
//     },
//     {
//       id: 6,
//       image: book7,
//       name: "Oloio",
//       author: "Madhu Sashan",
//       price: 130,
//     },
//     {
//       id: 7,
//       image: book8,
//       name: "Art Of Illustrator",
//       author: "Rabiul Vom",
//       price: 300,
//       sale: -30,
//     },
//     {
//       id: 8,
//       image: book9,
//       name: "New World For Children",
//       author: "Charise Jemes",
//       price: 120,
//     },
//     {
//       id: 9,
//       image: book10,
//       name: "War Of Dragon",
//       author: "Moren Nicol",
//       price: 200,
//     },
//     {
//       id: 10,
//       image: book11,
//       name: "Alone Walker",
//       author: "Soad Humber",
//       price: 75,
//     },
//     {
//       id: 11,
//       image: book12,
//       name: "The Hunter House",
//       author: "Rakib Jon",
//       price: 100,
//       sale: -5,
//     },
//   ]);
//   const settings = {
//     className: "center",
//     centerMode: true,
//     infinite: true,
//     speed: 500,
//     centerPadding: "60px",
//     slidesToShow: 7,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,

//     responsive: [
//       {
//         breakpoint: 1700,
//         settings: {
//           slidesToShow: 5,
//           slidesToScroll: 1,
//           infinite: true,
//         },
//       },
//       {
//         breakpoint: 1300,
//         settings: {
//           slidesToShow: 4,
//           slidesToScroll: 1,
//           infinite: true,
//         },
//       },
//       {
//         breakpoint: 1000,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//           infinite: true,
//         },
//       },
//       {
//         breakpoint: 800,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <section className="px-lg-0 px-4" data-testid="BestSeller">
//       <div className="container-fluid">
//         <div className="row justify-content-center">
//           <h2 className="blueHeader text-center mt-4 mb-5">Best Seller</h2>
//           <div className={`col-lg-11 ${styles.marginBottom}`}>
//             <Slider {...settings}>
//               {bestSeller.map((bestSeller, index) => (
//                 <BookCard
//                   cardStyle={{ margin: "10px", padding: "0px" }}
//                   key={bestSeller.id}
//                   image={bestSeller.image }
//                   name={bestSeller.name}
//                   price={bestSeller.price}
//                   author={bestSeller.author}
//                   rate={bestSeller.rate}
//                   sale={bestSeller.sale}
//                   section={"bestSeller"}
//                 />
//               ))}
//             </Slider>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BestSeller;

export default BestSeller;