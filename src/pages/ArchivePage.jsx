import React from "react";
import { showFormattedDate } from "../utils";
import CardNote from "../components/CardNote";
import { useSelector } from "react-redux";

const ArchivePage = () => {
  const notes = useSelector((state) => state.notes);
  const archivedNotes = notes.filter((note) => note.archived === true);

  return (
    <>
      <div className="list-note">
        {archivedNotes.length > 0 ? (
          archivedNotes.map((note) => (
            <CardNote
              key={note.id}
              {...note}
              createdAt={showFormattedDate(note.createdAt)}
            />
          ))
        ) : (
          <div className="not-found">Not Found</div>
        )}
      </div>
    </>
  );
};

export default ArchivePage;
