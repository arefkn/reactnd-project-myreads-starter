import React from 'react';
import PropTypes from 'prop-types';

const Book = ({ title, authors, coverUrl, shelves, currentShelf }) => {
  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url('${coverUrl}')` }}></div>
        <div className="book-shelf-changer">
          <select defaultValue={currentShelf}>
            <option value="none" disabled>Move to...</option>
            {shelves.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors.join(", ")}</div>
    </div>
  );
};

Book.propTypes = {
  title: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string).isRequired,
  coverUrl: PropTypes.string.isRequired,
  shelves: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentShelf: PropTypes.string.isRequired,
};

export default Book;