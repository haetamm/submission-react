import React from "react";
import { RiSaveFill } from "react-icons/ri";
import PropTypes from "prop-types";
import { archiveNote, unarchiveNote } from "../utils/api";
import { useDispatch } from "react-redux";
import { archivedById, unarchiveById } from "../store/notes";
import { isActive } from "../utils";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

const ButtonArchive = ({ id, archived }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const handleClick = async () => {
    if (archived) {
      const { data } = await unarchiveNote(id);
      if (data) {
        dispatch(unarchiveById(id));
        toast.success("Catatan berhasil diaktifkan");
      }
    } else {
      const { data } = await archiveNote(id);
      if (data) {
        dispatch(archivedById(id));
        toast.success("Catatan berhasil diarsipkan");
      }
    }
  };
  return (
    <>
      {!isActive(pathname, "/search") && (
        <div onClick={handleClick} className="cursor-pointer">
          <RiSaveFill className={`icon ${archived ? "active" : ""}`} />
        </div>
      )}
    </>
  );
};

ButtonArchive.propTypes = {
  id: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
};

export default ButtonArchive;
