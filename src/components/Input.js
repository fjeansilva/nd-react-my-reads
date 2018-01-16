import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  onChange, placeholder,
}) => <input type="text" onChange={onChange} placeholder={placeholder} />;

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default Input;
