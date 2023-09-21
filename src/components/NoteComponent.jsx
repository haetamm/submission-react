import React, { useState } from "react";
import PropTypes from 'prop-types';
import NoteHeaderComponent from "./NoteHeaderComponent";
import NoteCardComponent from "./NoteCardComponent"
import NotFoundComponent from "./NotFoundComponent";
import NoteNavComponent from './NoteNavComponent';

const NoteComponent = ({
    notes, deleteNote, getNoteById, updateNoteById, searchNoteByTitle
}) => {
    const [activeTab, setActiveTab] = useState(1);
    const [notesByTitle, setNotesByTitle] = useState({});

    const handleTabClick = (tabIndex) => {
        setActiveTab(tabIndex);
    };

    return (
        <div className="note-component">
            <div className="wrap ">
                <NoteHeaderComponent
                    searchNoteByTitle={searchNoteByTitle} setNotesByTitle={setNotesByTitle} handleTabClick={handleTabClick}
                />

                <NoteNavComponent
                    handleTabClick={handleTabClick}
                    activeTab={activeTab}
                />

                <div className="tabs">
                    <div className="tab">
                        <input
                            type="radio"
                            name="tabs"
                            id="tab1"
                            checked={activeTab === 1}
                            onChange={() => handleTabClick(1)}
                        />
                        <div className="note-height">
                            <div className="note-wrap ">
                                { notes.length ? (
                                        notes
                                        .sort((a, b) => b.id - a.id)
                                        .map((note) => (
                                            <NoteCardComponent
                                                key={note.id}
                                                {...note}
                                                onDelete={deleteNote}
                                                getNoteById={getNoteById}
                                                updateNoteById={updateNoteById}
                                            />
                                        ))                         
                                ) : (
                                        <NotFoundComponent />
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <div className="tab">
                        <input
                            type="radio"
                            name="tabs"
                            id="tab2"
                            checked={activeTab === 2}
                            onChange={() => handleTabClick(2)}
                        />
                        <div className="note-height">
                            <div className="note-wrap ">
                                { 
                                    notes.some(note => note.archive === true) ? (
                                        notes
                                            .filter(note => note.archive === true)
                                            .sort((a, b) => b.id - a.id)
                                            .map((note) => (
                                                <NoteCardComponent
                                                    key={note.id}
                                                    {...note}
                                                    onDelete={deleteNote}
                                                    getNoteById={getNoteById}
                                                    updateNoteById={updateNoteById}
                                                />
                                            ))                         
                                    ) : (
                                        <NotFoundComponent />
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <div className="tab">
                        <input
                            type="radio"
                            name="tabs"
                            id="tab3"
                            checked={activeTab === 3}
                            onChange={() => handleTabClick(3)}
                        />
                        <div className="note-height">
                            <div className="search-title">Hasil Pencarian :</div>
                            <div className="note-wrap ">
                                { notesByTitle.length ? (
                                        notesByTitle
                                        .sort((a, b) => b.id - a.id)
                                        .map((note) => (
                                            <NoteCardComponent
                                                key={note.id}
                                                {...note}
                                                onDelete={deleteNote}
                                                getNoteById={getNoteById}
                                                updateNoteById={updateNoteById}
                                                activeTab={activeTab}
                                            />
                                        ))                         
                                ) : (
                                        <NotFoundComponent />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

NoteComponent.propTypes = {
    notes: PropTypes.array.isRequired,
    deleteNote: PropTypes.func.isRequired,
    getNoteById: PropTypes.func.isRequired,
    updateNoteById: PropTypes.func.isRequired,
    searchNoteByTitle: PropTypes.func.isRequired,
}

export default NoteComponent;