import { Alert } from "bootstrap";
import React, { useState } from "react";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: " ",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        localStorage.setItem("token", json.token);
        window.location.href = "/";
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div
        className="container d-flex align-items-center justify-content-center"
        style={{ height: "calc(100vh - 56px)", gap: "12vw" }}
      >
        <h2
          style={{
            backgroundColor: "white",
            border: "2px solid white",
            borderRadius: "50px",
            padding: "10px 30px",
            textAlign: "center",
          }}
        >
          Signup
        </h2>
        <div
          style={{ width: "2px", height: "70vh", backgroundColor: "white" }}
        ></div>
        <form
          style={{
            backgroundColor: "currentcolor",
            borderRadius: "50px",
            padding: "41px",
            border: "2px solid white",
          }}
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-light">
              Name
            </label>
            <input
              required
              type="text"
              name="name"
              value={credentials.name}
              className="form-control"
              id="name"
              aria-describedby="nameHelp"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-light">
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              value={credentials.email}
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text text-light">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-light">
              Password
            </label>
            <input
              required
              name="password"
              type="password"
              value={credentials.password}
              className="form-control"
              id="password"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmpassword" className="form-label text-light">
              Confirm Password
            </label>
            <input
              required
              name="confirmpassword"
              type="password"
              value={credentials.confirmpassword}
              className="form-control"
              id="confirmpassword"
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
