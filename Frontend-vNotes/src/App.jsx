// App.js
import React from "react";
import NavBar from "./Components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import UpdateNote from "./Pages/UpdateNote";
import NoteState from "./context/notes/NoteState";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

const App = () => {
  return (
    <>
      <NoteState>
        <Router>
          <NavBar />
          <div className="container">
            <Routes>
              <Route element={<Home />} exect path="/" />
              <Route element={<About />} exect path="/about" />
              <Route exact path="/updateNote/:noteId" element={<UpdateNote />} />
              <Route exact path="/login" element={<Login/>} />
              <Route exact path="/signup" element={<Signup/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
};

export default App;
