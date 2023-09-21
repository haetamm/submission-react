import React from "react";
import PropTypes from 'prop-types';



const NoteNavComponent = ({ handleTabClick, activeTab }) => {
    return (
       <div className="note-nav">
            <ul>
                <li onClick={() => handleTabClick(1)} className={`nav ${activeTab === 1 ? 'active' : ''}`}>Catatan</li>
                <li onClick={() => handleTabClick(2)} className={`nav ${activeTab === 2 ? 'active' : ''}`}>Arsip</li>
            </ul>
        </div>
    )
}

NoteNavComponent.propTypes = {
    handleTabClick: PropTypes.func.isRequired,
    activeTab: PropTypes.number.isRequired,
}

export default NoteNavComponent;