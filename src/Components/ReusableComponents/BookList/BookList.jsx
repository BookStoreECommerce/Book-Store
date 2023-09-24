import React from "react";
import BookCard from '../BookCard/BookCard.jsx'

const BookList = ({NewBooks , sectionName}) => {
    return (
        <>
            {NewBooks?.map((book) => (
                <BookCard key={book.id} image ={book.image} name={book.name} price={book.price} author={book.author} rate={book.rate} section={sectionName}/>
            ))}
        </>
       
    );
}

export default BookList;