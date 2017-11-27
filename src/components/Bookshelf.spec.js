/* global describe, it, expect */
import React from 'react';
import { shallow } from 'enzyme';
import Bookshelf from './Bookshelf';

describe('Bookshelf component', () => {
  it('should render successfully', () => {
    expect(shallow(<Bookshelf />));
  });
});
