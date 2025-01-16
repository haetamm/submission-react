import React, { useContext } from "react";
import { translatedNames } from "../utils/lang";
import { AppContext } from "../contexts/AppContext";
import PropTypes from "prop-types";

const InputCustom = ({ name, value, type, handleChange, error }) => {
  const { language } = useContext(AppContext);
  return (
    <>
      <input
        type={type}
        placeholder={translatedNames[language][name]}
        name="title"
        value={value}
        onChange={handleChange}
      />
      <div className="wrap-message">
        {error && <small className="error-message">{error}</small>}
      </div>
    </>
  );
};

InputCustom.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

export default InputCustom;
