const DEFAULT_STATE = {
  noteById: null,
  notesActive: [],
  notesArchived: [],
};

const notesReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case "SET_ACTIVE_NOTES":
      return {
        ...state,
        notesActive: action.payload,
      };
    case "SET_ARCHIVED_NOTES":
      return {
        ...state,
        notesArchived: action.payload,
      };
    case "SET_NOTE_BY_ID":
      return {
        ...state,
        noteById: action.payload,
      };
    case "ADD_NOTE":
      return {
        ...state,
        notesActive: [...state.notesActive, action.payload],
      };
    case "DELETE_NOTE_BY_ID":
      return {
        ...state,
        notesActive: state.notesActive.filter(
          (note) => note.id !== action.payload
        ),
        notesArchived: state.notesArchived.filter(
          (note) => note.id !== action.payload
        ),
        noteById: null,
      };
    case "ARCHIVED_BY_ID":
      return {
        ...state,
        notesActive: state.notesActive.filter(
          (note) => note.id !== action.payload
        ),
        noteById:
          state.noteById && state.noteById.id === action.payload
            ? { ...state.noteById, archived: true }
            : state.noteById,
      };
    case "UNARCHIVED_BY_ID":
      return {
        ...state,
        notesArchived: state.notesArchived.filter(
          (note) => note.id !== action.payload
        ),
        noteById:
          state.noteById && state.noteById.id === action.payload
            ? { ...state.noteById, archived: false }
            : state.noteById,
      };
    default:
      return state;
  }
};

export const setActiveNotes = (notes) => ({
  type: "SET_ACTIVE_NOTES",
  payload: notes,
});

export const setArchivedNotes = (notes) => ({
  type: "SET_ARCHIVED_NOTES",
  payload: notes,
});

export const setNoteById = (notes) => ({
  type: "SET_NOTE_BY_ID",
  payload: notes,
});

export const addNote = (note) => ({
  type: "ADD_NOTE",
  payload: note,
});

export const deleteNoteById = (id) => ({
  type: "DELETE_NOTE_BY_ID",
  payload: id,
});

export const archivedById = (id) => ({
  type: "ARCHIVED_BY_ID",
  payload: id,
});

export const unarchiveById = (id) => ({
  type: "UNARCHIVED_BY_ID",
  payload: id,
});

export default notesReducer;
