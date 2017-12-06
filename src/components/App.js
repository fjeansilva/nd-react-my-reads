import React, { Component } from 'react';
import './App.css';
import BookShelf from './Bookshelf';
import { getAll } from '../utils/BooksAPI';

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    getAll().then((books) => this.setState({ books }));
  }

  render() {
    const { books } = this.state;

    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <BookShelf title="Currently Reading" books={books} />
            <BookShelf title="Want to Read" books={books} />
            <BookShelf title="Read" books={books} />
          </div>
        </div>
      </div>
    )
  }
}

export default BooksApp;
