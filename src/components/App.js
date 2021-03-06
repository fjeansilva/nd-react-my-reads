import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Bookshelf from './Bookshelf';
import Search from './Search';
import { getAll, update } from '../utils/BooksAPI';

class BooksApp extends Component {
  state = {
    books: [],
    loading: true
  }

  componentDidMount() {
    getAll().then((books) => this.setState({ books, loading: false }));
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
    const { loading, books } = this.state;

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <Bookshelf title="Currently Reading" books={this.filterByShelf('currentlyReading')} onUpdateBook={this.updateBook} loading={loading} />
              <Bookshelf title="Want to Read" books={this.filterByShelf('wantToRead')} onUpdateBook={this.updateBook} loading={loading} />
              <Bookshelf title="Read" books={this.filterByShelf('read')} onUpdateBook={this.updateBook} loading={loading} />
            </div>
            <div className="open-search">
              <Link to="/search">Add a Book</Link>
            </div>
          </div>
        )} />
        <Route path="/search" render={() => (
          <Search shelf={books} />
        )} />
      </div>
    )
  }
}

export default BooksApp;
