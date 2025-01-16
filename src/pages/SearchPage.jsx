import React, { useCallback, useContext, useEffect, useState } from "react";
import { showFormattedDate } from "../utils";
import CardNote from "../components/CardNote";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { translatedNames } from "../utils/lang";
import { setActiveNotes, setArchivedNotes } from "../store/notes";
import { getActiveNotes, getArchivedNotes } from "../utils/api";

const SearchPage = () => {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const dispatch = useDispatch();
  const { language } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const notesActive = useSelector((state) => state.notes.notesActive || []);
  const notesArchived = useSelector((state) => state.notes.notesArchived || []);
  const titleQuery = searchParams.get("title") || "";

  const fetchNotes = useCallback(async () => {
    const { data, error } = await getActiveNotes(setLoading);
    if (!error) {
      dispatch(setActiveNotes(data));
    }
  }, [dispatch]);

  const fetchArchivedNotes = useCallback(async () => {
    const { data, error } = await getArchivedNotes(setLoading);
    if (!error) {
      dispatch(setArchivedNotes(data));
    }
  }, [dispatch]);

  useEffect(() => {
    if (titleQuery) {
      setLoading(true);
      fetchNotes();
      fetchArchivedNotes();
    }
    setLoading(false);
  }, [dispatch, fetchArchivedNotes, fetchNotes, titleQuery]);

  useEffect(() => {
    if (titleQuery) {
      setNotes([...notesActive, ...notesArchived]);
    }
  }, [notesActive, notesArchived, titleQuery]);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(titleQuery.toLowerCase())
  );

  return (
    <>
      <div className="list-note">
        {titleQuery && (
          <h3>
            {translatedNames[language]["Hasil"]}: {titleQuery}
          </h3>
        )}
        {!titleQuery ? (
          <h3>{translatedNames[language]["Judul Pencarian"]}</h3>
        ) : loading ? (
          <div className="loading">
            {translatedNames[language]["Memuat..."]}
          </div>
        ) : filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <CardNote
              key={note.id}
              {...note}
              createdAt={showFormattedDate(note.createdAt)}
            />
          ))
        ) : (
          <div className="not-found">
            {translatedNames[language]["Tidak Ditemukan"]}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPage;
