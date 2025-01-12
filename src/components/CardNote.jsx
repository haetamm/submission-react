import React from "react";
import PropTypes from "prop-types";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill, RiSaveFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { updateArchived } from "../store/notes";
import { Link } from "react-router-dom";

const CardNote = ({ id, title, createdAt, body, archived }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="note-container">
        <div className="note-header">
          <div className="note-header__wrap">
            <img
              src="https://pbs.twimg.com/profile_images/1269621458822664192/NHV_D34w_400x400.jpg"
              alt="Avatar"
            />
            <div className="user-info">
              <Link to={`/notes/${id}`} className="name">
                <span>{title}</span>
              </Link>
              <span className="handle">{createdAt}</span>
            </div>
          </div>
          <div
            onClick={() => {
              dispatch({
                type: "OPEN_MODAL",
                payload: {
                  type: "update",
                  id: id,
                },
              });
            }}
            className="cursor-pointer"
          >
            <RiEdit2Fill className="icon" />
          </div>
        </div>
        <div className="note-content">{body}</div>
        <div className="note-actions">
          <div
            onClick={() => {
              dispatch({
                type: "OPEN_MODAL",
                payload: {
                  type: "delete",
                  id: id,
                },
              });
            }}
            className="cursor-pointer"
          >
            <MdDelete className="icon" />
          </div>
          <div
            onClick={() => {
              dispatch(updateArchived(id));
            }}
            className="cursor-pointer"
          >
            <RiSaveFill className={`icon ${archived ? "active" : ""}`} />
          </div>
        </div>
      </div>
    </>
  );
};

CardNote.propTypes = {
  id: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
};

export default CardNote;
