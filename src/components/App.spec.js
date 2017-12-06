/* global it, expect, describe, jest, beforeEach */
import React from 'react';
import { spy } from 'sinon';
import { shallow, mount } from 'enzyme';
import BookApp from './App';

jest.mock('../utils/BooksAPI.js');

describe('BookApp component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<BookApp />);
  });

  it('should render successfully', () => {
    expect(shallow(<BookApp />).exists()).toBeTruthy();
  });

  it('should render list books', () => {
    expect(wrapper.find('.list-books').exists()).toBeTruthy();
  });

  it('should render a title', () => {
    expect(wrapper.find('.list-books-title h1').exists()).toBeTruthy();
  });

  it('should render a content', () => {
    expect(wrapper.find('.list-books-content').exists()).toBeTruthy();
  });

  it('should have three bookshelf', () => {
    expect(wrapper.find('.bookshelf').length).toBe(3);
  });

  it('should have three shelfs with title', () => {
    const titles = wrapper.find('.bookshelf h2.bookshelf-title');
    expect(titles.map(node => node.text())).toEqual(['Currently Reading', 'Want to Read', 'Read']);
  });

  it('should have two books', () => {
    const books = [
      {
        title: 'To Kill a Mockingbird',
        authors: 'Harper Lee',
        imageLinks: {
          thumbnail: 'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api'
        },
      },
      {
        title: 'The Hobbit',
        authors: 'J.R.R. Tolkien',
        imageLinks: {
          thumbnail: 'http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api'
        },
      },
    ];
    wrapper.setState({ books: [] });
    expect(wrapper.state('books').length).toBe(0);
    wrapper.setState({ books });
    expect(wrapper.state('books').length).toBe(2);
  });

  it('calls componentDidMount() lifecycle method', () => {
    const componentDidMountSpy = spy(BookApp.prototype, 'componentDidMount');
    mount(<BookApp />);
    expect(BookApp.prototype.componentDidMount.calledOnce).toBeTruthy();
    componentDidMountSpy.restore();
  });
});

