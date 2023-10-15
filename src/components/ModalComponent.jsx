import React from "react";
import PropTypes from 'prop-types';
import { formatDate } from "../utils/helper";
import '../styles/ModalComponent.scss';


const ModalComponent = ({ openDelete, close, onDelete, id, detail, setDetail }) => {

    const closeModal = () => {
        close(false);
        setDetail({});
    }

    return (
        openDelete && (
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <div className={`modal-card ${detail.created_at ? 'detail-modal' : 'delete-modal'}`}>
                        <div className="modal-card-delete__body">
                            <div className="close-wrap">
                                <div onClick={closeModal} className="close">&times;</div>
                            </div>
                            {detail.created_at ? (
                                <> 
                                    <div className="detail-modal__wrap">
                                        <div className="detail-modal__title">{detail.title}</div>
                                        <small>{formatDate(detail.created_at)}</small>
                                        <hr /><hr />
                                        <div className="detail-modal__body">{detail.description}</div>                             
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>Catatan ini akan dihapus, yakin?</div>
                                    <button onClick={() => onDelete(id)} className="pointer">Delete</button>
                                </>
                                
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

ModalComponent.propTypes = {
    openDelete: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    detail: PropTypes.object,
    setDetail: PropTypes.func.isRequired,
}

export default ModalComponent;
