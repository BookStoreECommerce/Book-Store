import React,{ useState } from "react";
import BookList from "../../ReusableComponents/BookList/BookList";
import styles from '../LastSearch/LastSearch.module.css';
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


const LastSearch = () => {
    const [LastSearch] = useState([
        {
            id: 0,
            image: book,
            name: "Our World Our Life",
            author:"Lembid Noissa",
            price: 310,
            rate:1,
        },
        {
            id: 1,
            image: book2,
            name: "Blue In The Water",
            author:"Twent Momens",
            price: 310,
           rate:3,
        },
        {
            id: 2,
            image: book3,
            name: "Animals Life",
            author:"Ariean Hason",
            price: 200,
            rate:5
        }
        ,
        {
            id: 3,
            image: book4,
            name: "Memorise",
            author:"Lembid Noissa",
            price: 350,
            rate:4,
        }
        ,
        {
            id: 4,
            image: book5,
            name: "War Of Dragon",
            author:"Moren Nicol",
            price: 410,
            rate:2,
        }
        ,
        {
            id: 5,
            image: book6,
            name: "Moon Light Sadow",
            author:"Lebmid Traeh",
            price: 220,
            rate:5,
        }
        ,
        {
            id: 6,
            image: book7,
            name: "Oloio",
            author:"Madhu Sashan",
            price: 130,
            rate:3,
        }
        ,
        {
            id: 7,
            image: book8,
            name: "Art Of Illustrator",
            author:"Rabiul Vom",
            price: 300,
            rate:2,
        }
        ,
        {
            id: 8,
            image: book9,
            name: "New World For Children",
            author:"Charise Jemes",
            price: 120,
            rate:4
        }
        ,
        {
            id: 9,
            image: book10,
            name: "War Of Dragon",
            author:"Moren Nicol",
            price: 200,
            rate:5,
        }
        ,
        {
            id: 10,
            image: book11,
            name: "Alone Walker",
            author:"Soad Humber",
            price: 75,
            rate:0,
        }
        ,
        {
            id: 11,
            image: book12,
            name: "The Hunter House",
            author:'Rakib Jon',
            price: 100,
            rate:0,
        }
    ])
    let cutLastSearch = LastSearch.slice(0,4);
 
    return (
        <>
            <section id="LastSearch" data-testid='LastSearch'>
            <div className={`container`} >
                <div className={`row justify-content-center align-items-center`}>
                    <h2 className="blueHeader text-center mt-md-5 mb-2 pt-5" >Your Last Search</h2>
                    <BookList NewBooks={cutLastSearch} sectionName={"newBooks"} />
                </div>
            </div>
            </section>
        </>
    );
}

export default LastSearch;