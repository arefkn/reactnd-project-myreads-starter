import React from 'react';
import PropTypes from 'prop-types';

const Book = (props) => {
  const { book, shelves, moveBook } = props;
  const { title, authors, shelf, imageLinks } = book;
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url('${imageLinks.thumbnail}')` }}></div>
          <div className="book-shelf-changer">
            <select
              defaultValue={shelf ? shelf : "none"}
              onChange={(e) => {
                e.preventDefault();
                moveBook(book, e.target.value);
              }}
            >
              <option value="none" disabled>Move to...</option>
              {shelves.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors ? authors.join(", ") : "Unknown"}</div>
      </div>
    </li>
  );
};

Book.propTypes = {
  book: PropTypes.object,
  shelves: PropTypes.arrayOf(PropTypes.object).isRequired,
  moveBook: PropTypes.func
};

export default Book;