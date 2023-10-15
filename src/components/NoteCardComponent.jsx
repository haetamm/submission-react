import React, { useState } from "react";
import PropTypes from 'prop-types';
import { formatDate } from "../utils/helper";
import ModalComponent from "./ModalComponent";
import '../styles/NoteCardComponent.scss';

const NoteCardComponent = ({
    created_at, id, title, description, archive, onDelete, getNoteById, updateNoteById, activeTab
}) => {
    const [openModal, setOpenModal] = useState(false);
    const [deleteId, setDeleteId] = useState(0);
    const [detail, setDetail] = useState({});

    const setIdHandler = (id) => {
        setDeleteId(id);
        setOpenModal(true);
    }

    const detailNote = (id) => {
        setOpenModal(true)
        setDetail(getNoteById(id));
    }

    return (
        <>
            <div className="note-card">
                <div className="note-card-header">
                    <div className="note-card-header__wrap">
                        <h2 className='note-card__title line-clamp'>{title}</h2>
                        <small>{formatDate(created_at)}</small>
                    </div>
                    {!activeTab && 
                        <svg onClick={() => updateNoteById(id)} width="25px" height="25px" className={archive ? `pointer archived` : `pointer`} fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xmlSpace="preserve">
                            <path d="M30.563,0.5v511l225.434-76.824L481.438,511.5V0.5H30.563z M401.17,251.809H283.563v125.554 h-55.118V251.809H110.831v-52.859h117.614V74.518h55.118v124.432H401.17V251.809z"> </path>
                        </svg>
                    }
                </div>
                <hr /><hr />
                <div className='note-card-body'>{description}</div>
                <div className="note-card-footer">
                    <div className='note-card-footer__detail'>
                        {!activeTab && 
                            <svg onClick={() => setIdHandler(id)} fill="currentColor" width="25px" className='note-card-header__delete pointer' height="25px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490.646 490.646" xmlSpace="preserve">
                                <path d="M399.179,67.285l-74.794,0.033L324.356,0L166.214,0.066l0.029,67.318l-74.802,0.033l0.025,62.914h307.739L399.179,67.285z M198.28,32.11l94.03-0.041l0.017,35.262l-94.03,0.041L198.28,32.11z"></path>
                                <path d="M91.465,490.646h307.739V146.359H91.465V490.646z M317.461,193.372h16.028v250.259h-16.028V193.372L317.461,193.372z M237.321,193.372h16.028v250.259h-16.028V193.372L237.321,193.372z M157.18,193.372h16.028v250.259H157.18V193.372z"></path>
                            </svg>
                        }
                    </div>
                    <svg onClick={() => detailNote(id)} width="25px" height="25px" className='pointer' viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                        <g id="Icon-Set-Filled" transform="translate(-154.000000, -985.000000)" fill="#000000">
                            <path d="M180,997 C180,997.553 179.552,998 179,998 C178.448,998 178,997.553 178,997 L178.022,994.435 L173.244,999.213 L171.83,997.799 L176.628,993 L174,993 C173.448,993 173,992.553 173,992 C173,991.448 173.448,991 174,991 L178.972,991 C179.251,991 179.502,991.115 179.684,991.301 C179.877,991.465 180,991.704 180,992 L180,997 L180,997 Z M180,1010 C180,1010.3 179.877,1010.54 179.684,1010.7 C179.503,1010.88 179.251,1011 178.972,1011 L174,1011 C173.448,1011 173,1010.55 173,1010 C173,1009.45 173.448,1009 174,1009 L176.628,1009 L171.83,1004.2 L173.244,1002.79 L178.022,1007.57 L178,1005 C178,1004.45 178.448,1004 179,1004 C179.552,1004 180,1004.45 180,1005 L180,1010 L180,1010 Z M166.756,999.213 L161.978,994.435 L162,997 C162,997.553 161.552,998 161,998 C160.448,998 160,997.553 160,997 L160,992 C160,991.704 160.123,991.465 160.316,991.301 C160.498,991.115 160.749,991 161.028,991 L166,991 C166.552,991 167,991.448 167,992 C167,992.553 166.552,993 166,993 L163.372,993 L168.17,997.799 L166.756,999.213 L166.756,999.213 Z M166,1009 C166.552,1009 167,1009.45 167,1010 C167,1010.55 166.552,1011 166,1011 L161.028,1011 C160.749,1011 160.497,1010.88 160.316,1010.7 C160.123,1010.54 160,1010.3 160,1010 L160,1005 C160,1004.45 160.448,1004 161,1004 C161.552,1004 162,1004.45 162,1005 L161.978,1007.57 L166.756,1002.79 L168.17,1004.2 L163.372,1009 L166,1009 L166,1009 Z M182,985 L158,985 C155.791,985 154,986.791 154,989 L154,1013 C154,1015.21 155.791,1017 158,1017 L182,1017 C184.209,1017 186,1015.21 186,1013 L186,989 C186,986.791 184.209,985 182,985 L182,985 Z" id="zoom"> </path>
                        </g>
                    </svg>
                </div>
            </div>
            <ModalComponent
                openDelete={openModal}
                close={setOpenModal}
                onDelete={onDelete}
                id={deleteId}
                detail={detail}
                setDetail={setDetail}
            />
        </>
    )
    
}

NoteCardComponent.propTypes = {
    id: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    archive: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    getNoteById: PropTypes.func.isRequired,
    updateNoteById: PropTypes.func.isRequired,
    activeTab: PropTypes.number,
}

export default NoteCardComponent;