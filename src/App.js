import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'
import Book from './Book'
import { debounce } from 'throttle-debounce';
import ProgressBar from './ProgressBar';

class BooksApp extends React.Component {
  state = {
    loading: true,
    books: [],
    searchResults: [],
  }

  constructor() {
    super();

    this.moveBook = this.moveBook.bind(this);
    this.search = this.search.bind(this);
    this.searchApiCall = debounce(500, this.searchApiCall.bind(this));
  }

  componentDidMount() {
    this.loadAllBooks();
  }

  moveBook(book, newShelf) {
    this.setState({ loading: true });
    BooksAPI.update(book, newShelf).then(() => this.loadAllBooks());
  }

  loadAllBooks() {
    BooksAPI.getAll().then(books => this.setState({ books, loading: false }));
  }

  search(e) {
    const searchQuery = e.target.value;
    e.preventDefault();
    this.setState({ loading: true });
    this.searchApiCall(searchQuery);
  }

  searchApiCall(searchQuery) {
    BooksAPI.search(searchQuery).then(searchResults => this.setState({ searchResults: searchResults || [], loading: false }));
  }


  render() {
    const { books, searchResults, loading } = this.state;

    const shelves = [
      { value: "currentlyReading", label: "Currently Reading" },
      { value: "wantToRead", label: "Want to Read" },
      { value: "read", label: "Read" },
    ];

    return (
      <div className="app">
        <Route exact path='/' render={() =>
          (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <ProgressBar visible={loading} />
              <div className="list-books-content">
                <div>
                  {shelves.map((({ value, label }) =>
                    <Shelf
                      {...{
                        shelves,
                        books,
                        label,
                        moveBook: this.moveBook,
                        currentShelf: value,
                        key: value
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />
        <Route path='/search' render={() =>
          (
            <div className="search-books">
              <div className="search-books-bar">
                <Link className="close-search" to="/" onClick={() => this.setState({ searchResults: [] })}> Close</Link>
                <div className="search-books-input-wrapper">
                  <input type="text" placeholder="Search by title or author" onChange={this.search} />
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                  {searchResults && searchResults.length && searchResults.length > 0
                    ?
                    searchResults.map(((searchResult) => {
                      const existingBooks = books.filter((b) => b.id === searchResult.id); // do we have this on a shelf?
                      const book = existingBooks[0] || searchResult;
                      return (<Book
                        {...{
                          book,
                          shelves,
                          moveBook: this.moveBook,
                          key: book.id
                        }}
                      />);
                    }
                    ))
                    : searchResults.error
                  }
                </ol>
              </div>
            </div>)}
        />
      </div>
    )
  }
}

export default BooksApp
