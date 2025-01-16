import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { addNote } from "../store/notes";
import { AppContext } from "../contexts/AppContext.js";
import { translatedNames } from "../utils/lang.js";
import useInput from "../hooks/useInput.js";
import InputCustom from "./InputCustom.jsx";
import { createNote } from "../utils/api.js";
import { toast } from "sonner";

const FormNote = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { language } = useContext(AppContext);

  const {
    value: title,
    handleChange: handleTitleChange,
    error: titleError,
  } = useInput("title");

  const {
    value: body,
    handleChange: handleBodyChange,
    error: bodyError,
  } = useInput("body");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titleError && !bodyError) {
      const { data } = await createNote({ title, body }, setLoading);
      if (data) {
        dispatch(addNote(data));
        dispatch({
          type: "CLOSE_MODAL",
        });
        toast.success("Catatan berhasil dibuat");
      }
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <div className="wrap-input">
        <InputCustom
          type="text"
          name="title"
          value={title}
          handleChange={handleTitleChange}
          error={titleError}
        />
      </div>
      <div className="wrap-input">
        <textarea
          placeholder={translatedNames[language]["body"]}
          rows={6}
          name="body"
          value={body}
          onChange={handleBodyChange}
        />
        {bodyError && <small className="error-message">{bodyError}</small>}
      </div>
      <button
        disabled={!title || !body}
        className="cursor-pointer add-note"
        type="submit"
      >
        {loading ? "Loading" : translatedNames[language]["add"]}
      </button>
    </form>
  );
};

export default FormNote;
