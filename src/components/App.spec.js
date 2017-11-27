/* global it, expect, describe */
import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';

describe('App component', () => {
  const wrapper = mount(<App />);

  it('should render successfully', () => {
    expect(shallow(<App />).exists()).toBeTruthy();
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
});

