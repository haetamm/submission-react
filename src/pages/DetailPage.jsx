import React, { useCallback, useEffect, useState } from "react";
import CardNote from "../components/CardNote";
import { showFormattedDate } from "../utils";
import { useParams } from "react-router-dom";
import { getNote } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { setNoteById } from "../store/notes";

const DetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const note = useSelector((state) => state.notes.noteById);

  const fetchNote = useCallback(async () => {
    const { data } = await getNote(id, setLoading);
    dispatch(setNoteById(data));
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      fetchNote();
    }
  }, [fetchNote, id]);

  return (
    <>
      <div className="list-note">
        {loading ? (
          <div className="wrap-loading">
            <div className="loading" />
          </div>
        ) : note ? (
          note.id ? (
            <CardNote {...note} createdAt={showFormattedDate(note.createdAt)} />
          ) : (
            <div className="not-found">Invalid Note Data</div>
          )
        ) : (
          <div className="not-found">Not Found</div>
        )}
      </div>
    </>
  );
};

export default DetailPage;
