import React, { useContext } from "react";
import { FaPencil } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { AppContext } from "../contexts/AppContext";
import { translatedNames } from "../utils/lang";

const ButtonCreate = () => {
  const dispatch = useDispatch();
  const { language } = useContext(AppContext);
  return (
    <>
      <button
        onClick={() => {
          dispatch({
            type: "OPEN_MODAL",
            payload: {
              type: "add",
            },
          });
        }}
        aria-label="add note"
        className="custom-button cursor-pointer"
        type="button"
      >
        <FaPencil className="h-8 w-8 button-icon" />
        <div className="button-label">
          {translatedNames[language]["Tambah"]}
        </div>
      </button>
    </>
  );
};

export default ButtonCreate;
