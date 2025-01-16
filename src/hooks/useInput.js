import { useState } from "react";
import {
  validateBody,
  validateEmail,
  validateName,
  validatePassword,
  validatePasswordConfirmation,
  validateTitle,
} from "../utils/validation";

const useInput = (type, initialValue = "", relatedValue = "") => {
  const [value, setValue] = useState(initialValue);
  const [charCount, setCharCount] = useState(0);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    setCharCount(newValue.length);

    // Validasi berdasarkan tipe input
    if (type === "title") {
      setError(validateTitle(newValue));
    } else if (type === "body") {
      setError(validateBody(newValue));
    } else if (type === "name") {
      setError(validateName(newValue));
    } else if (type === "email") {
      setError(validateEmail(newValue));
    } else if (type === "password") {
      setError(validatePassword(newValue));
    } else if (type === "passwordConfirmation") {
      setError(validatePasswordConfirmation(relatedValue, newValue));
    }
  };

  return {
    value,
    setValue,
    charCount,
    error,
    handleChange,
  };
};

export default useInput;
