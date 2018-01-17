import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';
import Book from './Book';
import EmptyShelf from './EmptyShelf';


const Bookshelf = ({
  title, books, onUpdateBook, loading,
}) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {loading && (
          <Spinner name="ball-scale-ripple" color="green" />
        )}
        {books.length === 0 && !loading && (
          <EmptyShelf />
        )}
        {books.map(b => (
          <li key={b.id}>
            <Book
              book={b}
              onUpdate={onUpdateBook}
            />
          </li>
        ))}
      </ol>
    </div>
  </div>
);

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onUpdateBook: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Bookshelf;
