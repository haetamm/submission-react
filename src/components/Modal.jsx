import "../styles/modal.css";
import FormNote from "./FormNote";
import PropTypes from "prop-types";

const Modal = ({ isOpen, handleButton, close }) => {
  return (
    <>
      {isOpen && (
        <div id="myModal" className="modal-custom">
          <div className={`modal-content mt-besar`}>
            <div className={`modal-card besar-modal`}>
              <div className="modal-card-kecil__body">
                <div className="close-wrap flex justify-end">
                  <div
                    onClick={() => {
                      close(false);
                    }}
                    className="close"
                  >
                    &times;
                  </div>
                </div>
                <div className="besar-modal__wrap">
                  <FormNote handleButton={handleButton} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleButton: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

export default Modal;
