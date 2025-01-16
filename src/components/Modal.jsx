import { MdClose } from "react-icons/md";
import "../styles/modal.css";
import FormNote from "./FormNote";
import { useDispatch, useSelector } from "react-redux";
import Confirmation from "./Confirmation";
import { useContext } from "react";
import { translatedNames } from "../utils/lang";
import { AppContext } from "../contexts/AppContext";

const Modal = () => {
  const dispatch = useDispatch();
  const { isOpen, type, id } = useSelector((state) => state.modal);
  const { language } = useContext(AppContext);

  return (
    <>
      {isOpen && (
        <div className="modal-custom">
          <div className={`modal-content mt-besar`}>
            <div
              className={`modal-card ${
                type === "add" ? "besar-modal" : "kecil-modal"
              }`}
            >
              <div className="modal-card-kecil__body">
                <div className="close-wrap">
                  <h3>{translatedNames[language][type]}</h3>
                  <MdClose
                    className="icon cursor-pointer"
                    onClick={() => {
                      dispatch({
                        type: "CLOSE_MODAL",
                      });
                    }}
                  />
                </div>
                <div className="besar-modal__wrap">
                  {type === "add" && <FormNote />}
                  {type !== "add" && (
                    <Confirmation
                      name={translatedNames[language][type]}
                      id={id}
                      onClose={() => dispatch({ type: "CLOSE_MODAL" })}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
