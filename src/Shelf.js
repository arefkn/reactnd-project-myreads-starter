import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book'

const Shelf = ({ currentShelf, shelves, label, books, moveBook }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{label}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            books
              .filter((({ shelf }) => shelf === currentShelf))
              .map((book =>
                <Book
                  {...{
                    book,
                    shelves,
                    moveBook,
                    key: book.id
                  }}
                />
              ))}
        </ol>
      </div>
    </div>
  );
};

Shelf.propTypes = {
  currentShelf: PropTypes.string.isRequired,
  shelves: PropTypes.arrayOf(PropTypes.object).isRequired,
  label: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  moveBook: PropTypes.func
};

export default Shelf;