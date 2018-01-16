/* global describe, it, expect, beforeEach, jest */
import React from 'react';
import { shallow, mount } from 'enzyme';
import Search from './Search';
import Input from './Input';
import SearchBooks from './SearchBooks';

jest.mock('../utils/BooksAPI.js');

describe('Search Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Search />);
  });

  it('Should render successfully', () => {
    expect(shallow(<Search />).exists()).toBeTruthy();
  });

  it('Should render wrapper', () => {
    expect(wrapper.find('.search-books').exists()).toBeTruthy();
  });

  it('Should contain a search bar', () => {
    expect(wrapper.find('.search-books .search-books-bar').exists()).toBeTruthy();
  });

  it('Should contain a link to home page', () => {
    expect(wrapper.find('.search-books-bar a.close-search').exists()).toBeTruthy();
  });

  it('Should contain a wrapper to the input', () => {
    expect(wrapper.find('.search-books-bar .search-books-input-wrapper').exists()).toBeTruthy();
  });

  it('Should render an input', () => {
    expect(wrapper.find(Input).exists()).toBeTruthy();
  });

  it('Should pass a value to query state', () => {
    wrapper.find(Input).simulate('change', { target: { value: 'Android' } });
    expect(wrapper.state('query')).toEqual('Android');
  });

  it('Must have an empty value in query state', () => {
    wrapper.find(Input).simulate('change', { target: { value: 'xx' } });
    expect(wrapper.state('query')).toEqual('');
    wrapper.find(Input).simulate('change', { target: { value: 'x' } });
    expect(wrapper.state('query')).toEqual('');
    wrapper.find(Input).simulate('change', { target: { value: '' } });
    expect(wrapper.state('query')).toEqual('');
  });

  it('Must have a value in query state', () => {
    wrapper.find(Input).simulate('change', { target: { value: 'xxx' } });
    expect(wrapper.state('query')).toEqual('xxx');
  });

  it('Should render a SearchBooks component', () => {
    expect(wrapper.find(SearchBooks).exists()).toBeTruthy();
  });
});
