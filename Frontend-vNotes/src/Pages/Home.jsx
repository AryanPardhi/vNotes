import React from "react";
import Notes from "../Components/Notes";
import AddNotes from "../Components/AddNotes";

const Home = () => {
  return (
    <>
      <div
        className="container"
        style={{
          marginTop: "30px",
          borderRadius: "30px",
          backgroundColor: "#f1f1f1"
        }}
      >
        <AddNotes />
        <Notes />
      </div>
    </>
  );
};

export default Home;
