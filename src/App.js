import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'
import Book from './Book'

import ProgressBar from './ProgressBar';

class BooksApp extends React.Component {
  state = {
    loading: true,
    books: [],
    searchQuery: "",
    searchResults: [],
    shelves: [
      { value: "currentlyReading", label: "Currently Reading" },
      { value: "wantToRead", label: "Want to Read" },
      { value: "read", label: "Read" },
    ]
  }

  constructor() {
    super();

    this.moveBook = this.moveBook.bind(this);
    this.search = this.search.bind(this);
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
    e.preventDefault();
    const searchQuery = e.target.value;
    this.setState({ searchQuery });
    BooksAPI.search(searchQuery).then(searchResults => this.setState({ searchResults: searchResults || [], loading: false }));
  }

  render() {
    const { books, searchResults, shelves, loading, searchQuery } = this.state;

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
                  {
                    /*
                      NOTES: The search from BooksAPI is limited to a particular set of search terms.
                      You can find these search terms here:
                      https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
   
                      However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                      you don't find a specific author or title. Every search is limited by search terms.
                    */
                  }
                  <input type="text" placeholder="Search by title or author" onChange={this.search} />

                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                  {searchResults && searchResults.length && searchResults.length > 0
                    ?
                    searchResults.map(((book) =>
                      <Book
                        {...{
                          book,
                          shelves,
                          moveBook: this.moveBook,
                          key: book.id
                        }}
                      />
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
