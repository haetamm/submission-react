import React from 'react';
import { MdClose } from 'react-icons/md';
import '../styles/modal.css';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../stores/modal/action';
import Confirmation from './Confirmation';
import useLanguage from '../hooks/useLanguage';
import { translatedNames } from '../utils/lang';
import FormThread from './FormThread';

const Modal = () => {
  const dispatch = useDispatch();
  const { isOpen, type } = useSelector((state) => state.modal);
  const language = useLanguage();

  return (
    <>
      {isOpen && (
        <div className="modal-custom">
          <div className="modal-content">
            <div
              className={`modal-card ${
                type === 'add' ? 'besar-modal' : 'kecil-modal'
              }`}
            >
              <div className="modal-card-kecil__body">
                <div className="close-wrap">
                  <h3>{translatedNames[language][type]}</h3>
                  <MdClose
                    className="icon cursor-pointer"
                    onClick={() => {
                      dispatch(closeModal());
                    }}
                  />
                </div>
                <div className="besar-modal__wrap">
                  {type === 'add' && <FormThread />}
                  {type !== 'add' && (
                    <Confirmation
                      name={translatedNames[language][type]}
                      onClose={() => dispatch(closeModal())}
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