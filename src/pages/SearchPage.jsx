import React from "react";
import { showFormattedDate } from "../utils";
import CardNote from "../components/CardNote";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const notes = useSelector((state) => state.notes);
  const titleQuery = searchParams.get("title") || "";

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(titleQuery.toLowerCase())
  );

  return (
    <>
      <div className="list-note">
        {titleQuery && <h3>Hasil Pencarian: {titleQuery}</h3>}
        {!titleQuery ? (
          <h3>Tulis judul di input search untuk mencari catatan</h3>
        ) : filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
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

export default SearchPage;
