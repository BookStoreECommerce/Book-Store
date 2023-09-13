import React,{useEffect, useState} from "react";
import BookList from "../../../ReusableComponents/BookList/BookList";
import styles from '../NewBooks/NewBooks.module.css';
import book from '../../../../assets/10.jpg'
import book2 from '../../../../assets/3.jpg'
import book3 from '../../../../assets/6.jpg'
import book4 from '../../../../assets/11.jpg'

const NewBooks = () => {
    const [NewBooks, setNewBooks] = useState([
        {
            id:0,
            image: book,
            name: "War of Dragon",
            price: 350
        },
        {
            id:1,
            image:book4,
            name: "Alone Walker",
            price: 105
        },
        {
            id:2,
            image:book3,
            name: "Moon Light Srdow",
            price: 200
        }
        ,
        {
            id:3,
            image:book2,
            name: "Animals Life",
            price: 400
        }
        ,
        {
            id:4,
            image:book2,
            name: "Animals Life",
            price: 400
        }
        ,
        {
            id:5,
            image:book2,
            name: "Animals Life",
            price: 400
        }
        ,
        {
            id:6,
            image:book2,
            name: "Animals Life",
            price: 400
        }
        ,
        {
            id:7,
            image:book2,
            name: "Animals Life",
            price: 400
        }
        ,
        {
            id:8,
            image:book2,
            name: "Animals Life",
            price: 400
        }
        ,
        {
            id:9,
            image:book2,
            name: "Animals Life",
            price: 400
        }
        ,
        {
            id:10,
            image:book2,
            name: "Animals Life",
            price: 400
        }
        ,
        {
            id:11,
            image:book2,
            name: "Animals Life",
            price: 400
        }
    ])
    const [startIndex, setStart] = useState(0);
    const [lastIndex, setLast] = useState(4);
    // let lastIndex=4;
    let cutNewBooks = NewBooks.slice(startIndex,lastIndex);
    
    // const [newArray , setNewArray] = useState(cutNewBooks);
    console.log("start: ",startIndex);
    console.log("end: ",lastIndex);
    const shiftRight = ()=>{
        setStart((prev) => prev + 1 )
        setLast((prev) => prev + 1 )
        console.log("Right");
        // setNewArray(NewBooks.slice(startIndex,lastIndex))
    }
    const shiftLeft = ()=>{
        setStart((prev) => prev - 1 )
        setLast((prev) => prev - 1 )
        console.log("Left");
        // setNewArray(NewBooks.slice(startIndex,lastIndex))
    }

//     useEffect(()=>{
// console.log(newArray);
//     },[newArray])

    return ( 
        <>
        <div className="container">
            <div className={`row justify-content-center align-items-center text-center ${styles.gap}`}>
            <h2 className="blueHeader">New Arrivals</h2>
            <div className="d-flex justify-content-end">
                <button className={`${styles.btn} ${styles.leftBtn}`} onClick={shiftLeft}><i class="fa-solid fa-arrow-left"></i></button>
                <button className={`${styles.btn} ${styles.rightBtn}`} onClick={shiftRight}><i class="fa-solid fa-arrow-right"></i></button>
            </div>
            <BookList NewBooks = {cutNewBooks} sectionName={"newBooks"}/>
            </div>
        </div>
        </>
     );
}
 
export default NewBooks;