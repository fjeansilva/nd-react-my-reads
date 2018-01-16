import React, { Component } from 'react';
import './App.css';
import Bookshelf from './Bookshelf';
import Search from './Search';
import { getAll, update } from '../utils/BooksAPI';

class BooksApp extends Component {
  state = {
    books: [],
    showSearchPage: false
  }

  componentDidMount() {
    getAll().then((books) => this.setState({ books }));
  }

  filterByShelf = (shelf) => {
    return this.state.books.filter(b => b.shelf === shelf);
  }

  updateBook = (book, shelf) => {

    // update book in state
    this.setState((prevState) => {
      return {
        books: prevState.books.map(b => {
          if (b.id === book.id) b.shelf = shelf;
          return b;
        })
      }
    });

    // update book in BooksAPI
    update(book, shelf);
  }

  render() {
    const { books, showSearchPage } = this.state;
    return (
      <div className="app">
        {showSearchPage ? (
          <Search />
        ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <Bookshelf title="Currently Reading" books={this.filterByShelf('currentlyReading')} onUpdateBook={this.updateBook} />
            <Bookshelf title="Want to Read" books={this.filterByShelf('wantToRead')} onUpdateBook={this.updateBook} />
            <Bookshelf title="Read" books={this.filterByShelf('read')} onUpdateBook={this.updateBook} />
          </div>
          <div className="open-search">
            <a onClick={() => this.setState({ showSearchPage: true })}>Add a Book</a>
          </div>
        </div>
        )}
      </div>
    )
  }
}

export default BooksApp;
