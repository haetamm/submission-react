import React, { useState } from "react";
import PropTypes from 'prop-types';
import '../styles/NoteHeaderComponent.scss';

const NoteHeaderComponent = ({ searchNoteByTitle, handleTabClick, setNotesByTitle }) => {

    const [query, setQuery] = useState('');

    const onChangeQueryHandler = (event) => {
        setQuery(event.target.value)
    }

    const onSubmitSearch = (event) => {
        event.preventDefault();
        if (query.trim() === '') {
            handleTabClick(1)
        } else {
            setNotesByTitle(searchNoteByTitle(query));
            handleTabClick(3);
        }
    }

    return (
        <div className="note-header">
            <div className='title'>Catatan Amal Burukmu</div>
            <div className="search">
                <form onSubmit={onSubmitSearch} className='search-label'>
                    <input onChange={onChangeQueryHandler} value={query} type="search" className='search-input' placeholder='Cari catatan...' />
                </form>
            </div>
        </div>
    )
}

NoteHeaderComponent.propTypes = {
    searchNoteByTitle: PropTypes.func.isRequired,
    handleTabClick: PropTypes.func.isRequired,
    setNotesByTitle: PropTypes.func.isRequired,
}

export default NoteHeaderComponent;