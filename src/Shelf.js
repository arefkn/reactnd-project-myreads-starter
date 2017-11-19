import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book'

const Shelf = ({ currentShelf, shelves, label, books }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{label}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            books
              .filter((({ shelf }) => shelf === currentShelf))
              .map((({ title, authors, imageLinks }) =>
                <li>
                  <Book
                    {...{
                      title,
                      authors,
                      currentShelf,
                      shelves,
                      coverUrl: imageLinks.thumbnail
                    }}
                  />
                </li>
              ))}
        </ol>
      </div>
    </div>
  );
};

Shelf.propTypes = {
  currentShelf: PropTypes.string.isRequired,
  shelves: PropTypes.arrayOf(PropTypes.object).isRequired,
  label: PropTypes.arrayOf(PropTypes.string).isRequired,
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Shelf;