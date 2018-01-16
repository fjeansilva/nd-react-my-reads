import React, { Component } from 'react';
import { search } from '../utils/BooksAPI';
import Input from './Input';
import SearchBooks from './SearchBooks';

class Search extends Component {
  state = {
    query: ''
  }

  handleChange = ({ target }) => {
    const { value } = target;

    if (value.length >= 3) {
      this.setState({ query: value.trim() });
    } else {
      this.setState({ query: '' });
    }
  }

  render() {
    const { books, query } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a href="/search" className="close-search">Close</a>
          <div className="search-books-input-wrapper">
            <Input onChange={this.handleChange} placeholder="Search by title or author" />
          </div>
        </div>
        <div className="search-books-results">
          <SearchBooks query={query} />
        </div>
      </div>
    )
  }
}

export default Search;
