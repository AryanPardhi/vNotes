// UpdateNote.js
import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import NoteContext from "../context/notes/noteContext";

const UpdateNote = () => {
  const { noteId } = useParams();
  const context = useContext(NoteContext);
  const { notes, editNote } = context;
  const [note, setNote] = useState({ title: "", desc: "", tag: "" });

  useEffect(() => {
    const selectedNote = notes.find((note) => note._id === noteId);
    if (selectedNote) {
      setNote({
        title: selectedNote.title,
        desc: selectedNote.desc,
        tag: selectedNote.tag,
      });
    }
  }, [noteId, notes]);

  const handleClick = async (e) => {
    e.preventDefault();
    await editNote(noteId, note.title, note.desc, note.tag);
    // Redirect to home page after updating note
    window.location.href = "/";
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div
        className="updateNote-container"
        style={{
          borderRadius: "30px",
          backgroundColor: "#575b5b",
          padding: "3vw",
          border: "10px #f1f1f1 solid",
          height: "calc(100vh - 84px)",
          marginTop:"28px"
        }}
      >
        <h2 className="text-center text-light">Update Note</h2>

        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label text-light">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="title"
              value={note.title}
              onChange={onChange}
            />
            <div id="titleHelp" className="form-text text-light">
              Enter Your Note Title
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label text-light">
              Description
            </label>
            <textarea
              className="form-control"
              id="desc"
              onChange={onChange}
              value={note.desc}
              name="desc"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label text-light">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onChange}
            />
          </div>

          <Link
            className=""
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              marginTop: "3vh",
            }}
            to={"/"}
          >
            <button
              type="submit"
              className="btn btn-primary text-center"
              onClick={handleClick}
            >
              Update Note
            </button>
          </Link>
        </form>
      </div>
    </>
  );
};

export default UpdateNote;
