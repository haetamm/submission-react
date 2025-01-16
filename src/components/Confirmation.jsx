import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { deleteNoteById } from "../store/notes";
import { deleteNote } from "../utils/api";
import { toast } from "sonner";

const Confirmation = ({ id, name, onClose }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleButton = async () => {
    if (id) {
      const { data } = await deleteNote(id, setLoading);
      if (data) {
        dispatch(deleteNoteById(id));
        onClose();
        toast.success("Catatan berhasil dihapus");
      }
    } else {
      localStorage.removeItem("accessToken");
      dispatch({
        type: "LOGOUT",
      });
    }
  };

  return (
    <>
      <button onClick={handleButton} className="cursor-pointer btn-delete">
        {loading ? "Loading" : name}
      </button>
    </>
  );
};

Confirmation.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Confirmation;
