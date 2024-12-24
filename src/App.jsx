import React, { useState } from "react";
import CardNote from "./components/CardNote";
import FormSearchNote from "./components/FormSearchNote";
import FormNote from "./components/FormNote";
import { getInitialData, showFormattedDate } from "./utils";
import Modal from "./components/Modal";
import NavNote from "./components/NavNote";
import ButtonModal from "./components/ButtonModal";

const App = () => {
  const [activeTab, setActiveTab] = useState("notes");
  const [query, setQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [notes, setNotes] = useState(getInitialData());
  const [filteredNotes, setFilteredNotes] = useState(
    notes.filter((note) => !note.archived)
  );

  const handleTabChange = (link, updatedNotes = notes, searchQuery = query) => {
    setActiveTab(link);
    setNotes(updatedNotes);

    let filtered;
    if (link === "notes") {
      filtered = updatedNotes.filter((note) => !note.archived);
    } else if (link === "archive") {
      filtered = updatedNotes.filter((note) => note.archived);
    } else if (link === "search") {
      filtered = updatedNotes.filter((note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      filtered = updatedNotes;
    }

    setFilteredNotes(filtered);
  };

  const addNote = ({ title, body }) => {
    const currentDate = new Date();
    const newNote = {
      id: +new Date(),
      createdAt: currentDate.toISOString(),
      title,
      body,
      archived: false,
    };
    const updatedNotes = [newNote, ...notes];
    handleTabChange("notes", updatedNotes);
    setOpenModal(false);
  };

  const searchNoteByTitle = (query) => {
    setQuery(query);
    if (query.trim()) {
      handleTabChange("search", notes, query);
    } else {
      handleTabChange("notes", notes);
    }
  };

  const deleteNoteById = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    handleTabChange(activeTab, updatedNotes);
  };

  const toggleIsArchived = (noteId) => {
    const updateNotes = notes.map((note) =>
      note.id === noteId ? { ...note, archived: !note.archived } : note
    );

    handleTabChange(activeTab, updateNotes);
  };

  return (
    <>
      <main className="container">
        <section className="form-note">
          <div className="wrap-logo">
            <img src="logo.jpg" alt="logo" className="logo" />
          </div>
          <FormNote handleButton={addNote} />
        </section>

        <section className="wrap-section">
          <FormSearchNote onSearch={searchNoteByTitle} />

          <section className="section-list-note">
            <NavNote activeTab={activeTab} handleTabChange={handleTabChange} />

            <div className="list-note">
              {activeTab === "search" && query.trim() && (
                <h3>Hasil Pencarian: {query}</h3>
              )}
              {filteredNotes.length > 0 ? (
                filteredNotes.map((note) => (
                  <CardNote
                    key={note.id}
                    {...note}
                    createdAt={showFormattedDate(note.createdAt)}
                    deleteNoteById={deleteNoteById}
                    toggleIsArchived={toggleIsArchived}
                  />
                ))
              ) : (
                <div className="not-found">Not Found </div>
              )}
            </div>
          </section>
        </section>
      </main>
      <ButtonModal openModal={setOpenModal} />
      <Modal isOpen={openModal} handleButton={addNote} close={setOpenModal} />
    </>
  );
};

export default App;
