/* global describe, it, expect, jest, beforeEach */
import React from 'react';
import { spy } from 'sinon';
import { shallow, mount } from 'enzyme';
import SearchBooks from './SearchBooks';
import templateHTML from '../utils/__mocks__/template';

jest.mock('../utils/BooksAPI.js');

describe('SearchBooks component', () => {
  let wrapper;
  let books;
  let updateBook;
  beforeEach(() => {
    wrapper = mount(<SearchBooks query="" />);
    updateBook = spy();
    books = [
      {
        id: 'abc',
        title: 'To Kill a Mockingbird',
        authors: ['Harper Lee'],
        imageLinks: {
          thumbnail: 'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api'
        },
        shelf: 'read',
      },
      {
        id: 'def',
        title: 'The Hobbit',
        authors: ['J.R.R. Tolkien'],
        imageLinks: {
          thumbnail: 'http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api'
        },
        shelf: 'read',
      },
    ];
  });

  it('Should render successfully', () => {
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('.search-books-results').exists()).toBeTruthy();
  });

  it('Should contain a grid books', () => {
    expect(wrapper.find('.search-books-results ol.books-grid').exists()).toBeTruthy();
  });

  it('Should contain a query prop', () => {
    expect(wrapper.props().query).toEqual('');
  });

  it('Should have a books state', () => {
    expect(wrapper.state().books.length).toBe(0);
  });

  it('calls componentWillReceiveProps() lifecycle method', () => {
    const componentWillReceivePropsSpy = spy(SearchBooks.prototype, 'componentWillReceiveProps');
    const wrapperSearch = mount(<SearchBooks query="" />);
    wrapperSearch.setProps({ query: 'art' });
    expect(SearchBooks.prototype.componentWillReceiveProps.calledOnce).toBeTruthy();
    componentWillReceivePropsSpy.restore();
  });

  it('Should pass a value to query prop and return three books', async () => {
    const wrapperSearch = shallow(<SearchBooks query="" />);
    await wrapperSearch.instance().componentWillReceiveProps({ query: 'React' });
    expect(wrapperSearch.state().books.length).toBe(3);
  });

  it('Should pass a value to query prop and return nothing', async () => {
    const wrapperSearch = shallow(<SearchBooks query="" />);
    await wrapperSearch.instance().componentWillReceiveProps({ query: 'javascript' });
    expect(wrapperSearch.state().books.length).toBe(0);
  });

  it('Should contain a list with three itens', async () => {
    const component = mount(<SearchBooks query="" />);
    await component.instance().componentWillReceiveProps({ query: 'React' });
    expect(component.html()).toEqual(templateHTML);
  });

  it('Should call update function', () => {
    const component = mount(<SearchBooks query="" />);
    component.setState({ books });
    expect(component.state().books.length).toBe(2);
    const bookActual = component.state().books;
    expect(bookActual.filter(b => b.shelf === 'currentlyReading').length).toBe(0);
    component.find('.book-shelf-changer > select').first().simulate('change', { target: { value: 'currentlyReading' } });
    const booksUpdated = component.state().books;
    expect(booksUpdated.filter(b => b.shelf === 'currentlyReading').length).toBe(1);
  });
});
