import React from 'react';
import PropTypes from 'prop-types';

const InputCustom = ({ label, name, value, type, onChange, error }) => {
  return (
    <div>
      <input
        id={name}
        data-testid={name}
        type={type}
        placeholder={label}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete={type === 'password' ? 'new-password' : 'off'}
      />
      <div className="wrap-message">
        {error && <small data-testid={`${name}-error`} className="error-message">{error}</small>}
      </div>
    </div>
  );
};

InputCustom.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default InputCustom;
