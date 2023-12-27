import React from "react";
import BookCard from "../BookCard/BookCard.jsx";
const BookList = ({ NewBooks, sectionName }) => {

  return (

    <>
      {NewBooks?.map((book) => (
        <BookCard
          key={book._id || book?.id}
          image={book.image}
          name={book.name}
          price={book.price}
          author={book.author}
          section={sectionName}
          slug={book?.slug}
         id={book?.id}
         rate={book?.rating}

        />
      ))}
    </>
  );
};
export default BookList;
