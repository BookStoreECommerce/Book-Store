import React,{useState} from "react";
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
        },
        {
            id:3,
            image:book2,
            name: "Animals Life",
            price: 400
        }
    ])
    return ( 
        <>
        <div className="container">
            <div className={`row justify-content-center align-items-center ${styles.gap}`}>
            <BookList NewBooks = {NewBooks} sectionName={"newBooks"}/>
            </div>
        </div>
        </>
     );
}
 
export default NewBooks;