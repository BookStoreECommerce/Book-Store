import React from "react";
import BookList from "../../ReusableComponents/BookList/BookList";
import { useSelector } from "react-redux";
import styles from './LastSearch.module.css'

const LastSearch = () => {
    const { searchedBooks } = useSelector((state) => state.auth);
    const lastSearchedBooks = searchedBooks.map((ele) => {return {"id": ele._id, "image": ele.image, "name": ele.name, "slug": ele.slug, "author": ele.author, "price": ele.price, "rating": ele.rating}}); 

    let cutLastSearch = lastSearchedBooks.slice(0, 4);

    return (
        <>
        {cutLastSearch.length !== 0 && ( 
             <section id="lastSearchedBooks" data-testid='lastSearchedBooks'>
            <h2 className="blueHeader text-center my-md-5 my-3">Your Last Search</h2>
            <div className={`container-fluid px-0 ${styles.LastSearch} ${styles.fixContainerFluid}`}>
                <div className="container">
                    <div className={`row justify-content-center align-items-center`}>
                        <BookList NewBooks={cutLastSearch} sectionName={"newBooks"} />
                    </div>
                </div>
            </div>
        </section>)}
        </>
    );
}

export default LastSearch;