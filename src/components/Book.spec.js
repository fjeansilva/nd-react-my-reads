/* global describe, it, expect */
import React from 'react';
import { shallow } from 'enzyme';
import Book from './Book';

describe('Book component', () => {
  it('should render successfully', () => {
    expect(shallow(<Book />).exists()).toBeTruthy();
  });
});
