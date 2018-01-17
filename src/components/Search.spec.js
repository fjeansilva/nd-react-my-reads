/* global describe, it, expect, beforeEach, jest */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import Search from './Search';
import Input from './Input';
import SearchBooks from './SearchBooks';

jest.mock('../utils/BooksAPI.js');

describe('Search Component', () => {
  it('Should render successfully', () => {
    expect(shallow(<MemoryRouter initialEntries={['/', '/search']} initialIndex={1}><Search /></MemoryRouter>).exists()).toBeTruthy();
  });

  it('Should render wrapper', () => {
    const wrapper = mount(<MemoryRouter initialEntries={['/', '/search']} initialIndex={1}><Search /></MemoryRouter>);
    expect(wrapper.find('.search-books').exists()).toBeTruthy();
  });

  it('Should contain a search bar', () => {
    const wrapper = mount(<MemoryRouter initialEntries={['/', '/search']} initialIndex={1}><Search /></MemoryRouter>);
    expect(wrapper.find('.search-books .search-books-bar').exists()).toBeTruthy();
  });

  it('Should contain a link to home page', () => {
    const wrapper = mount(<MemoryRouter initialEntries={['/', '/search']} initialIndex={1}><Search /></MemoryRouter>);
    expect(wrapper.find('.search-books-bar a.close-search').exists()).toBeTruthy();
  });

  it('Should contain a wrapper to the input', () => {
    const wrapper = mount(<MemoryRouter initialEntries={['/', '/search']} initialIndex={1}><Search /></MemoryRouter>);
    expect(wrapper.find('.search-books-bar .search-books-input-wrapper').exists()).toBeTruthy();
  });

  it('Should render an input', () => {
    const wrapper = mount(<MemoryRouter initialEntries={['/', '/search']} initialIndex={1}><Search /></MemoryRouter>);
    expect(wrapper.find(Input).exists()).toBeTruthy();
  });

  it('Should pass a value to query state', () => {
    const wrapper = mount(<MemoryRouter initialEntries={['/', '/search']} initialIndex={1}><Search /></MemoryRouter>);
    wrapper.find(Input).simulate('change', { target: { value: 'Android' } });
    expect(wrapper.find(Search).instance().state).toEqual({ query: 'Android' });
  });

  it('Must have an empty value in query state', () => {
    const wrapper = mount(<MemoryRouter initialEntries={['/']} initialIndex={0}><Search /></MemoryRouter>);
    wrapper.find(Input).simulate('change', { target: { value: 'xx' } });
    expect(wrapper.find(Search).instance().state).toEqual({ query: '' });
    wrapper.find(Input).simulate('change', { target: { value: 'x' } });
    expect(wrapper.find(Search).instance().state).toEqual({ query: '' });
    wrapper.find(Input).simulate('change', { target: { value: '' } });
    expect(wrapper.find(Search).instance().state).toEqual({ query: '' });
  });

  it('Must have a value in query state', () => {
    const wrapper = mount(<MemoryRouter initialEntries={['/']} initialIndex={0}><Search /></MemoryRouter>);
    wrapper.find(Input).simulate('change', { target: { value: 'xxx' } });
    expect(wrapper.find(Search).instance().state).toEqual({ query: 'xxx' });
  });

  it('Should render a SearchBooks component', () => {
    const wrapper = mount(<MemoryRouter initialEntries={['/']} initialIndex={0}><Search /></MemoryRouter>);
    expect(wrapper.find(SearchBooks).exists()).toBeTruthy();
  });
});
