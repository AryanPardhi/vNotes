// notes.js
import React, { useContext, useEffect } from "react";
import contextValue from "../context/notes/noteContext";
import { Link } from "react-router-dom";

const Notes = () => {
  const context = useContext(contextValue);
  const { notes, deleteNote, getNotes } = context;

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      window.location.href = "/login";
    }
  }, []);

  return (
    <>
      <div
        className="note-container mt-3"
        style={{
          borderRadius: "30px",
          backgroundColor: "#575b5b",
          padding: "1vw",
          borderBottom: "10px #f1f1f1 solid",
        }}
      >
        <h2 className="text-center pt-3 text-light">Your Notes</h2>
        <div
          className="card-container d-flex align-items-center justify-content-center"
          style={{ gap: "20px", flexWrap: "wrap", paddingTop: "20px" }}
        >
          {notes.map((note, key) => (
            <div className="card" key={key} style={{ width: "18rem" }}>
              <div
                className="card-body"
                style={{ backgroundColor: "antiquewhite" }}
              >
                <h5 className="card-title">Title : {note.title}</h5>
                <p className="card-text">Description : {note.desc}</p>
                <p className="card-text">Tag : {note.tag}</p>
                <p className="card-text">Date : {note.date}</p>
                <Link to={`/updateNote/${note._id}`}>
                  <i
                    className="fa-solid fa-pen-to-square mx-2 fs-4"
                    style={{ cursor: "pointer" }}
                  ></i>
                </Link>
                <i
                  className="fa-solid fa-trash mx-2 fs-4"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    deleteNote(note._id);
                  }}
                ></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Notes;
