// noteState.js
import React, { useState } from "react";
import NoteContext from "./noteContext";
import { json } from "react-router-dom";

const NoteState = (props) => {
  const host = "http://localhost:3000";
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);

  // get all notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Add note
  const addNote = async (title, desc, tag) => {
    try {
      const response = await fetch(`${host}/notes/addnotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ title, desc, tag }),
      });
      const newNote = await response.json();
      setNotes([...notes, newNote]);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Delete Note
  const deleteNote = async (id) => {
    try {
      await fetch(`${host}/notes/deletenotes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Edit Note
  const editNote = async (id, title, desc, tag) => {
    try {
      const response = await fetch(`${host}/notes/updatenotes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ title, desc, tag }),
      });
      if (response.ok) {
        const updatedNote = { _id: id, title, desc, tag }; // Updated note object
        setNotes(notes.map((note) => (note._id === id ? updatedNote : note)));
      } else {
        console.error("Failed to update note:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
