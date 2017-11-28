import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const Bookshelf = ({ title, books }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.map(b => (
          <li key={b.title}><Book title={b.title} authors={b.authors} cover={b.cover} /></li>
        ))}
      </ol>
    </div>
  </div>
);

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
};

export default Bookshelf;
