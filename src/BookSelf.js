import React from "react";
import Book from "./Book";
export default function BookSelf({ reading, books ,handleMove}) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{reading}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
            <Book book={book} handleMove={handleMove}/>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
