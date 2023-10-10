import React from "react";
import BookList from "../../ReusableComponents/BookList/BookList";
import { useSelector } from "react-redux";


const LastSearch = () => {
    const { searchedBooks } = useSelector((state) => state.auth);
    const lastSearchedBooks = searchedBooks.map((ele) => {return {"id": ele._id, "image": ele.image.secure_url, "name": ele.name, "slug": ele.slug, "author": ele.author, "price": ele.price, "rate": ele.rating}}); 

    let cutLastSearch = lastSearchedBooks.slice(0,4);
 
    return (
        <>
            <section id="lastSearchedBooks" data-testid='lastSearchedBooks'>
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