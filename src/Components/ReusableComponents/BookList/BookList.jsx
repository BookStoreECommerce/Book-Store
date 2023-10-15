import React from "react";
import BookCard from "../BookCard/BookCard.jsx";
const BookList = ({ NewBooks, sectionName }) => {
  return (
    <>
      {NewBooks?.map((book) => (
        <BookCard
          key={book._id || book?.id}
          image={book.image?.secure_url}
          name={book.name}
          price={book.price}
          author={book.author}
          rate={book.rate}
          section={sectionName}
          slug={book?.slug}
        />
      ))}
    </>
  );
};
export default BookList;
