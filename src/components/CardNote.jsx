import React from "react";
import PropTypes from "prop-types";

const CardNote = ({
  id,
  title,
  createdAt,
  body,
  archived,
  deleteNoteById,
  toggleIsArchived,
}) => {
  return (
    <>
      <div className="note-container">
        <div className="note-header">
          <img
            src="https://pbs.twimg.com/profile_images/1269621458822664192/NHV_D34w_400x400.jpg"
            alt="Avatar"
          />
          <div className="user-info">
            <span className="name">{title}</span>
            <span className="handle">{createdAt}</span>
          </div>
        </div>
        <div className="note-content">{body}</div>
        <div className="note-actions">
          <div
            onClick={() => {
              if (window.confirm("Yakin dihapus?")) {
                deleteNoteById(id);
              }
            }}
            className="cursor-pointer"
          >
            <img src="delete.svg" alt="logo-delete" width="28" height="28" />
          </div>
          <div onClick={() => toggleIsArchived(id)} className="cursor-pointer">
            <img
              src={`${archived ? "un-save.svg" : "save.svg"}`}
              alt="undo-icon"
              width="28"
              height="28"
            />
          </div>
        </div>
      </div>
    </>
  );
};

CardNote.propTypes = {
  id: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  deleteNoteById: PropTypes.func.isRequired,
  toggleIsArchived: PropTypes.func.isRequired,
};

export default CardNote;
