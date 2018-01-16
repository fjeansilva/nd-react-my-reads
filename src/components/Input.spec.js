/* global describe, it, expect */
import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import Input from './Input';

describe('Input component', () => {
  const onChange = spy();
  const wrapper = shallow(<Input onChange={onChange} placeholder="Search by title or author" />);

  it('Should render successfully', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('Should render an input', () => {
    expect(wrapper.find('input').exists()).toBeTruthy();
  });

  it('Should contain an onChange prop', () => {
    expect(wrapper.prop('onChange')).toEqual(onChange);
  });

  it('Should contain a placeholder prop', () => {
    expect(wrapper.prop('placeholder')).toEqual('Search by title or author');
  });
});
