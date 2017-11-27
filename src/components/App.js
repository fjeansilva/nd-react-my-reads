import React from 'react';
import './App.css';

const BooksApp = () => (
  <div className="app">
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div className="bookshelf" />
        <div className="bookshelf" />
        <div className="bookshelf" />
      </div>
    </div>
  </div>
);

export default BooksApp;
