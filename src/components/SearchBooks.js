import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { search, update } from '../utils/BooksAPI';
import Book from './Book';

class SearchBooks extends Component {
  state = {
    books: []
  }
  
  componentWillReceiveProps(nextProps, nextState) {
    const { query } = nextProps;
    const { shelf } = this.props;

    this.setState({ books: [] });
    
    if(query.length >= 3) {
      search(query.trim(), 30)
      .then(data => {
        const { items } = data;
        const books = items ? [] : data;

        books.map(b => { 
          const book = shelf.filter(s => s.id === b.id); 
          book.length > 0 ? b.shelf = book[0].shelf : b; 
          return b; 
        });
        
        this.setState({ books });
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
  shelf: PropTypes.array.isRequired
};

export default SearchBooks;
