import React from "react";
import { showFormattedDate } from "../utils";
import CardNote from "../components/CardNote";
import { useSelector } from "react-redux";

const HomePage = () => {
  const notes = useSelector((state) => state.notes);
  return (
    <>
      <div className="list-note">
        {notes.length > 0 ? (
          notes.map((note) => (
            <CardNote
              key={note.id}
              {...note}
              createdAt={showFormattedDate(note.createdAt)}
            />
          ))
        ) : (
          <div className="not-found">Not Found </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
