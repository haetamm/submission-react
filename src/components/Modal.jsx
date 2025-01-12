import { MdClose } from "react-icons/md";
import "../styles/modal.css";
import FormNote from "./FormNote";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteById } from "../store/notes";

const Modal = () => {
  const dispatch = useDispatch();
  const { isOpen, type, id } = useSelector((state) => state.modal);

  return (
    <>
      {isOpen && (
        <div className="modal-custom">
          <div className={`modal-content mt-besar`}>
            <div
              className={`modal-card ${
                type === "delete" ? "kecil-modal" : "besar-modal"
              }`}
            >
              <div className="modal-card-kecil__body">
                <div className="close-wrap">
                  <h3>
                    {type === "add"
                      ? "Tambah"
                      : type === "update"
                      ? "Update"
                      : "Hapus"}{" "}
                    Catatan
                  </h3>
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
                  {type !== "delete" && <FormNote id={id} />}
                  {type === "delete" && (
                    <>
                      <div>Catatan akan dihapus?</div>
                      <button
                        onClick={() => {
                          dispatch(deleteNoteById(id));
                          dispatch({
                            type: "CLOSE_MODAL",
                          });
                        }}
                        className="cursor-pointer btn-delete"
                      >
                        Hapus{" "}
                      </button>
                    </>
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
