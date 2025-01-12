import React from "react";
import CardNote from "../components/CardNote";
import { useSelector } from "react-redux";
import { showFormattedDate } from "../utils";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const { id } = useParams();
  const notes = useSelector((state) => state.notes);
  const note = notes.find((note) => note.id === id);
  return (
    <>
      <div className="list-note">
        {note ? (
          <CardNote {...note} createdAt={showFormattedDate(note.createdAt)} />
        ) : (
          <div className="not-found">Not Found </div>
        )}
      </div>
    </>
  );
};

export default DetailPage;
