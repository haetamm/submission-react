import React, { useCallback, useContext, useEffect, useState } from "react";
import { showFormattedDate } from "../utils";
import CardNote from "../components/CardNote";
import { AppContext } from "../contexts/AppContext";
import { translatedNames } from "../utils/lang";
import { getArchivedNotes } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { setArchivedNotes } from "../store/notes";

const ArchivePage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { language } = useContext(AppContext);
  const notes = useSelector((state) => state.notes.notesArchived);

  const fetchNotes = useCallback(async () => {
    const { data } = await getArchivedNotes(setLoading);
    dispatch(setArchivedNotes(data));
  }, [dispatch]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <>
      <div className="list-note">
        {loading ? (
          <>
            <div className="wrap-loading">
              <div className="loading" />
            </div>
          </>
        ) : notes && notes.length > 0 ? (
          notes.map((note) => (
            <CardNote
              key={note.id}
              {...note}
              createdAt={showFormattedDate(note.createdAt)}
            />
          ))
        ) : (
          <div className="not-found">
            {" "}
            {translatedNames[language]["Tidak Ditemukan"]}
          </div>
        )}
      </div>
    </>
  );
};

export default ArchivePage;
