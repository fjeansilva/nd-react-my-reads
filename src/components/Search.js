import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Debounce } from 'react-throttle';
import { search } from '../utils/BooksAPI';
import { Link } from 'react-router-dom';
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
    const { shelf } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <Debounce time="400" handler="onChange">
              <Input onChange={this.handleChange} placeholder="Search by title or author" />
            </Debounce>
          </div>
        </div>
        <div className="search-books-results">
          <SearchBooks query={query} shelf={shelf}/>
        </div>
      </div>
    )
  }
}

Search.propTypes = {
  shelf: PropTypes.array.isRequired
}

export default Search;
