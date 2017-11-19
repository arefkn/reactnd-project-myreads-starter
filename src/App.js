import React from 'react'
import { Switch, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'

class BooksApp extends React.Component {
  state = {
    books: [],
    shelves: [
      { value: "currentlyReading", label: "Currently Reading" },
      { value: "wantToRead", label: "Want to Read" },
      { value: "read", label: "Read" },
      { value: "none", label: "None" }
    ]
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ books }));
  }

  render() {
    const { books, shelves } = this.state;

    return (
      <div className="app">
        <Switch>
          <Route exact path='/' render={() =>
            (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    {this.state.shelves.map((({ value, label }) =>
                      <Shelf
                        {...{
                          shelves,
                          books,
                          label,
                          currentShelf: value,
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
                  <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
                  <div className="search-books-input-wrapper">
                    {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
                    <input type="text" placeholder="Search by title or author" />

                  </div>
                </div>
                <div className="search-books-results">
                  <ol className="books-grid"></ol>
                </div>
              </div>)}
          />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
