import React, { useState } from "react";
import PropTypes from "prop-types";

const FormNote = ({ handleButton }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState({ title: "", body: "" });
  const [characterCount, setCharacterCount] = useState(0);

  const validateTitle = (value) => {
    if (value.trim() === "") {
      return "Judul tidak boleh kosong";
    } else if (value.length > 50) {
      return "Judul maksimal 50 karakter";
    }
    return "";
  };

  const validateBody = (value) => {
    if (value.trim() === "") {
      return "Deskripsi tidak boleh kosong";
    }
    return "";
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setCharacterCount(value.length);
    setTitle(value);
    setError((prevError) => ({
      ...prevError,
      title: validateTitle(value),
    }));
  };

  const handleBodyChange = (e) => {
    const value = e.target.value;
    setBody(value);
    setError((prevError) => ({
      ...prevError,
      body: validateBody(value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const titleError = validateTitle(title);
    const bodyError = validateBody(body);

    setError({ title: titleError, body: bodyError });

    if (!titleError && !bodyError) {
      handleButton({ title, body });
      setTitle("");
      setBody("");
      setError({ title: "", body: "" });
      setCharacterCount(0);
    }
  };

  return (
    <>
      <form className="note-form" onSubmit={handleSubmit}>
        <div className="wrap-input">
          <input
            type="text"
            placeholder="Tulis judul disini"
            value={title}
            onChange={handleTitleChange}
          />
          <div className="wrap-message">
            {error.title && (
              <span className="error-message">{error.title}</span>
            )}
            <div className="char-length">{characterCount}/50</div>
          </div>
        </div>
        <div className="wrap-input">
          <textarea
            placeholder="Tuliskan catatanmu disini"
            rows={4}
            value={body}
            onChange={handleBodyChange}
          />
          {error.body && <span className="error-message">{error.body}</span>}
        </div>
        <button className="cursor-pointer" type="submit">
          Tambah Catatan
        </button>
      </form>
    </>
  );
};

FormNote.propTypes = {
  handleButton: PropTypes.func.isRequired,
};

export default FormNote;
