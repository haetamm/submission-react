import { notes } from "../utils/local-data";

const DEFAULT_STATE = Array.isArray(notes) ? notes : [];

const notesReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case "GET_ALL_NOTES":
      return state;
    case "ADD_NOTE":
      return [...state, action.payload];
    case "DELETE_NOTE_BY_ID":
      return state.filter((note) => note.id !== action.payload);
    case "UPDATE_ARCHIVED":
      return state.map((note) =>
        note.id === action.payload.id
          ? { ...note, archived: !note.archived }
          : note
      );
    case "UPDATE_NOTE_BY_ID":
      return state.map((note) =>
        note.id === action.payload.id
          ? { ...note, title: action.payload.title, body: action.payload.body }
          : note
      );
    default:
      return state;
  }
};

export const getAllNotes = () => ({
  type: "GET_ALL_NOTES",
});

export const addNote = (note) => ({
  type: "ADD_NOTE",
  payload: note,
});

export const deleteNoteById = (id) => ({
  type: "DELETE_NOTE_BY_ID",
  payload: id,
});

export const updateArchived = (id) => ({
  type: "UPDATE_ARCHIVED",
  payload: { id },
});

export const updateNoteById = (id, title, body) => ({
  type: "UPDATE_NOTE_BY_ID",
  payload: { id, title, body },
});

export default notesReducer;
