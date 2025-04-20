import React from 'react';
import { MdClose } from 'react-icons/md';
import '../styles/modal.css';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../stores/modal/action';
import Confirmation from './Confirmation';
import FormThread from './FormThread';
import { typeModal } from '../utils/constans';

const Modal = () => {
  const dispatch = useDispatch();
  const { isOpen, type } = useSelector((state) => state.modal);

  return (
    <>
      {isOpen && (
        <div className="modal-custom">
          <div className="modal-content">
            <div
              className={`modal-card ${
                type === typeModal.ADD ? 'besar-modal' : 'kecil-modal'
              }`}
            >
              <div className="modal-card-kecil__body">
                <div className="close-wrap">
                  <h3 data-testid="title-modal">{ type === typeModal.ADD ? 'Create Thread' : 'Logout' }</h3>
                  <MdClose
                    data-testid="close-modal"
                    className="icon cursor-pointer"
                    onClick={() => {
                      dispatch(closeModal());
                    }}
                  />
                </div>
                <div className="besar-modal__wrap">
                  {type === typeModal.ADD && <FormThread />}
                  {type === typeModal.LOGOUT && (
                    <Confirmation
                      name='Logout'
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