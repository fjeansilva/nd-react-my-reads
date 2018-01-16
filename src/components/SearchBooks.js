import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { search } from '../utils/BooksAPI';
import Book from './Book';
import { update } from '../utils/BooksAPI';

class SearchBooks extends Component {
  state = {
    books: []
  }
  
  componentWillReceiveProps(nextProps, nextState) {
    const { query } = nextProps;
    this.setState({ books: [] });
    
    if(query.length >= 3) {
      search(query.trim(), 30)
      .then(data => {
        const { items } = data;
        const books = items ? [] : data;
        this.setState({ books })
      })
    }
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

  render(){
    const { books } = this.state;
    return (
      <div className="search-books-results">
        <ol className="books-grid">
          {books.map(b => <li key={b.id}><Book book={b} onUpdate={this.updateBook} /></li>)}
        </ol>
      </div>
    )
  }  
}

SearchBooks.propTypes = {
  query: PropTypes.string.isRequired,
};

export default SearchBooks;
