import React from "react";
import PropTypes from "prop-types";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import AvatarUser from "./AvatarUser";
import ButtonArchive from "./ButtonArchive";
import { isActive } from "../utils";

const CardNote = ({ id, title, createdAt, body, archived }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { img_url, name } = useSelector((state) => state.user);
  return (
    <>
      <div className="note-container">
        <div className="note-header">
          <div className="note-header__wrap">
            <AvatarUser img={img_url} />
            <div className="user-info">
              <div className="name">
                <span>{name}</span>
              </div>
              <span className="handle">{createdAt}</span>
            </div>
          </div>
        </div>
        <Link to={`/notes/${id}`} className="wrap-note-content">
          <div className="note-content">
            <p className="note-title">{title}</p>
            <p>{body}</p>
          </div>
        </Link>
        <div
          className={`${
            isActive(pathname, "/search") ? "justify-endd" : "justify-beetween"
          } note-actions`}
        >
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
          <ButtonArchive id={id} archived={archived} />
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
