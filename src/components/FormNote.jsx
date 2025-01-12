import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { validateBody, validateTitle } from "../utils/validation.js";
import { addNote, updateNoteById } from "../store/notes"; // Impor action dari Redux store

const FormNote = ({ id }) => {
  const dispatch = useDispatch();
  const [charCount, setCharCount] = useState(0);
  const [errors, setErrors] = useState({ title: "", body: "" });
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const notes = useSelector((state) => state.notes);

  useEffect(() => {
    if (id) {
      const note = notes.find((note) => note.id === id);

      if (note) {
        setTitle(note.title);
        setBody(note.body);
        setCharCount(note.title.length);
      }
    }
  }, [id, dispatch, notes]);

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setCharCount(value.length);
    setTitle(value);
    setErrors((prevError) => ({
      ...prevError,
      title: validateTitle(value),
    }));
  };

  const handleBodyChange = (e) => {
    const value = e.target.value;
    setBody(value);
    setErrors((prevError) => ({
      ...prevError,
      body: validateBody(value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const titleError = validateTitle(title);
    const bodyError = validateBody(body);
    setErrors({ title: titleError, body: bodyError });

    if (!titleError && !bodyError) {
      if (id) {
        dispatch(updateNoteById(id, title, body));
        dispatch({
          type: "CLOSE_MODAL",
        });
      } else {
        dispatch(
          addNote({
            id: new Date().toISOString(),
            title,
            body,
            createdAt: new Date().toISOString(),
            archived: false,
          })
        );
        dispatch({
          type: "CLOSE_MODAL",
        });
      }
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <div className="wrap-input">
        <input
          type="text"
          placeholder="Tulis judul disini"
          name="title"
          value={title}
          onChange={handleTitleChange}
        />
        <div className="wrap-message">
          <div className="wrap-error">
            {errors.title && (
              <small className="error-message">{errors.title}</small>
            )}
          </div>
          <div className="char-length">{charCount}/50</div>
        </div>
      </div>
      <div className="wrap-input">
        <textarea
          placeholder="Tuliskan catatanmu disini"
          rows={6}
          name="body"
          value={body}
          onChange={handleBodyChange}
        />
        {errors.body && <small className="error-message">{errors.body}</small>}
      </div>
      <button className="cursor-pointer" type="submit">
        {id ? "Perbarui Catatan" : "Tambah Catatan"}
      </button>
    </form>
  );
};

FormNote.propTypes = {
  id: PropTypes.string,
};

export default FormNote;
