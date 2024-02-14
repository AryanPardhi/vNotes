import React, { useState, useContext } from "react";
import contextValue from "../context/notes/noteContext";

const AddNotes = () => {
  const context = useContext(contextValue);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", desc: "", tag: "Default" });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.desc, note.tag);
    setNote({ title: "", desc: "", tag: "" }); // Resetting form fields after adding note
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div
        className="addNotes-container"
        style={{
          borderRadius: "30px",
          backgroundColor: "#575b5b",
          padding: "3vw",
          borderTop: "10px #f1f1f1 solid",
        }}
      >
        <h2 className="text-center text-light">Add Note</h2>
        {/* form */}
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

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddNotes;
