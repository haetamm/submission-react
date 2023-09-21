import React from "react";
import FormComponent from "./FormComponent";
import NoteComponent from "./NoteComponent";
import { getData } from "../utils/source/note";


class NoteApp extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          notes: getData(),
      }

      this.onAddNote = this.onAddNote.bind(this);
      this.onDeleteNote = this.onDeleteNote.bind(this);
      this.getNoteById = this.getNoteById.bind(this);
      this.updateNoteArchiveStatus = this.updateNoteArchiveStatus.bind(this);
      this.searchNoteByTitle = this.searchNoteByTitle.bind(this);
  }

  onAddNote({ title, description }) {
    this.setState((prevState) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
      return {
        notes: [
          ...prevState.notes,
          {
            id: +new Date(),
            created_at: formattedDate,
            title,
            description,
            archive: false,
          },
        ],
      }
    });
  }

  onDeleteNote(id) {
    const notes = this.state.notes.filter(note => note.id !== id);
    this.setState({ notes });
  }

  getNoteById(id) {
    const foundNote = this.state.notes.find(note => note.id === id);
    return foundNote;
  }

  updateNoteArchiveStatus(id) {
    this.setState(prevState => {
      const updatedNotes = prevState.notes.map(note => {
        if (note.id === id) {
          return { ...note, archive: !note.archive };
        }
        return note;
      });
      return { notes: updatedNotes };
    });
  }

  searchNoteByTitle(query) {
    const searchResults = this.state.notes.filter(note =>
      note.title.toLowerCase().includes(query.toLowerCase())
    );
    return searchResults;
  }


  render() {
    return (
      <div className="container">
        <div className="main">
          <FormComponent
            addNote={this.onAddNote}
          />
          <NoteComponent
            notes={this.state.notes}
            deleteNote={this.onDeleteNote}
            getNoteById={this.getNoteById}
            updateNoteById={this.updateNoteArchiveStatus}
            searchNoteByTitle={this.searchNoteByTitle}
          />
        </div>
      </div>
    )

  }
}

export default NoteApp;
