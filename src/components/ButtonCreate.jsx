import React from "react";
import { FaPencil } from "react-icons/fa6";
import { useDispatch } from "react-redux";

const ButtonCreate = () => {
  const dispatch = useDispatch();
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
        className="custom-button"
        type="button"
      >
        <FaPencil className="h-8 w-8" />
      </button>
    </>
  );
};

export default ButtonCreate;
