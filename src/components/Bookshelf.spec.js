/* global describe, it, expect */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import Bookshelf from './Bookshelf';
import EmptyShelf from './EmptyShelf';

describe('Bookshelf component', () => {
  const onUpdateBook = spy();
  const books = [
    {
      id: 'abc',
      title: 'To Kill a Mockingbird',
      authors: ['Harper Lee'],
      imageLinks: {
        thumbnail: 'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api'
      },
    },
    {
      id: 'abcd',
      title: 'The Hobbit',
      authors: ['J.R.R. Tolkien'],
      imageLinks: {
        thumbnail: 'http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api'
      },
    },
  ];
  const element = (<Bookshelf title="Reading" books={books} onUpdateBook={onUpdateBook} loading={false} />);
  const wrapper = mount(element);
  const grid = wrapper.find('.bookshelf-books > ol.books-grid');

  it('should render successfully', () => {
    const component = shallow(element);
    expect(component.find('.bookshelf').exists()).toBeTruthy();
  });

  it('should have a prop title', () => {
    expect(wrapper.prop('title')).toEqual('Reading');
  });

  it('should have a prop books', () => {
    expect(wrapper.prop('books').length).toBe(2);
  });

  it('should render a title', () => {
    const title = wrapper.find('h2.bookshelf-title');
    expect(title.exists()).toBeTruthy();
    expect(title.text()).toEqual('Reading');
  });

  it('should render a grid', () => {
    expect(grid.exists()).toBeTruthy();
  });

  it('should render a grid with two books', () => {
    expect(grid.find('li .book .book-title').length).toBe(2);
  });

  it('should call onUpdateBook', () => {
    wrapper.find('.book-top .book-shelf-changer > select').first().simulate('change', { target: { value: 'currentlyReading' } });
    expect(onUpdateBook.calledOnce).toBeTruthy();
  });

  it('Should render a EmptyShelf', () => {
    const component = mount(<Bookshelf
      title="Reading"
      books={[]}
      onUpdateBook={onUpdateBook}
      loading={false}
    />);
    expect(component.find(EmptyShelf).exists()).toBeTruthy();
  });
});
