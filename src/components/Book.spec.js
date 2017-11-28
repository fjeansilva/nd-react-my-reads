/* global describe, it, expect */
import React from 'react';
import { shallow, mount } from 'enzyme';
import Book from './Book';

describe('Book component', () => {
  const coverUrl = 'cover-url';
  const book = <Book title="React" authors="Jean Silva" cover={coverUrl} />;
  const wrapper = mount(book);

  it('should render successfully', () => {
    expect(shallow(book).find('.book').exists()).toBeTruthy();
  });

  it('should contain a prop title', () => {
    expect(wrapper.prop('title')).toEqual('React');
  });

  it('should contain a prop authors', () => {
    expect(wrapper.prop('authors')).toEqual('Jean Silva');
  });

  it('should contain a prop cover', () => {
    expect(wrapper.prop('cover')).toEqual(coverUrl);
  });

  it('should render a title', () => {
    const title = wrapper.find('.book-title');
    expect(title.exists()).toBeTruthy();
    expect(title.text().length).toBeGreaterThan(0);
    expect(title.text()).toEqual('React');
  });

  it('should render authors', () => {
    const authors = wrapper.find('.book-authors');
    expect(authors.exists()).toBeTruthy();
    expect(authors.text().length).toBeGreaterThan(0);
    expect(authors.text()).toEqual('Jean Silva');
  });

  it('should render a cover', () => {
    expect(wrapper.find('.book-top > .book-cover').exists()).toBeTruthy();
  });

  it('should render a select to change the shelf', () => {
    expect(wrapper.find('.book-top .book-shelf-changer > select').exists()).toBeTruthy();
  });

  it('should render a select with five options', () => {
    const options = wrapper.find('.book-top .book-shelf-changer > select option');
    const optionTexts = options.map(node => node.text());
    const optionValues = options.map(node => node.instance().value);
    const texts = ['Move to...', 'Currently Reading', 'Want to Read', 'Read', 'None'];
    const values = ['none', 'currentlyReading', 'wantToRead', 'read', 'none'];
    const elementDisabled = <option value="none" disabled>Move to...</option>;
    expect(options.length).toBe(5);
    expect(optionTexts).toEqual(texts);
    expect(optionValues).toEqual(values);
    expect(wrapper.containsMatchingElement(elementDisabled)).toBeTruthy();
  });
});
