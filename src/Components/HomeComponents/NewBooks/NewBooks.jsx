import React,{ useState } from "react";
import BookList from "../../../Components/ReusableComponents/BookList/BookList";
import styles from '../NewBooks/NewBooks.module.css';
import { useSelector } from "react-redux";


const NewBooks = () => {
    const { newBooksArray } = useSelector((state) => state.books);

    const newBooks = newBooksArray.map((ele) => {return {"id": ele._id, "image": ele.image.secure_url, "name": ele.name, "slug": ele.slug, "author": ele.author, "price": ele.price, "rate": ele.rating}}); 

    const [startIndex, setStart] = useState(0);
    const [lastIndex, setLast] = useState(4);
    // const [lastIndex, setLast] = useState(1);
    const [leftBtn, setLeftBtn] = useState(true);
    const [rightBtn, setRightBtn] = useState(false);
    let cutNewBooks = newBooks.slice(startIndex, lastIndex);
  
    const shiftRight = () => {
        setStart((prev) => prev + 1)
        setLast((prev) => prev + 1)
        setLeftBtn(false)
        if (lastIndex === newBooks.length - 1) {
            setRightBtn(true)
        }
    }

    const shiftLeft = () => {
        setStart((prev) => prev - 1)
        setLast((prev) => prev -= 1)
        if (startIndex - 1 <= 0) {
            setLeftBtn(true)

        }
        if(lastIndex -1 <= newBooks.length - 1){
            setRightBtn(false)

        }
    }
 
    return (
        <>
            <section id="NewBooks" data-testid='NewBooks'>
            <div className={`container`} >
                <div className={`row justify-content-center align-items-center`}>
                    <h2 className="blueHeader text-center my-md-5 my-3" >New Arrivals</h2>
                    <div className="d-flex justify-content-end">
                        <button data-testid="left" className={`${leftBtn ? styles.disabled : styles.enabled} ${styles.btn} ${styles.leftBtn} `} id="leftBtn" onClick={shiftLeft} ><i className="fa-solid fa-arrow-left"></i></button>
                        <button data-testid="right" className={`${rightBtn ? styles.disabled : styles.enabled} ${styles.btn} `} id="righttBtn" onClick={shiftRight}><i className="fa-solid fa-arrow-right"></i></button>
                    </div>
                    <div className="row flex-nowrap overflow-hidden p-0">    
                        <BookList NewBooks={cutNewBooks} sectionName={"newBooks"} />
                    </div>
                </div>
            </div>
            </section>
        </>
    );
}

export default NewBooks;