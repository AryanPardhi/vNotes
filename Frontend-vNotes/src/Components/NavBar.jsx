import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  let location = useLocation();

  const handelLogout = ()=>{
    localStorage.removeItem('token');
    window.location.href = "/login";
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <h4 className="text-light text-center">v-Notes</h4>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse .ms-1"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {/* <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
            { !localStorage.getItem('token') ?  <form>
              <Link to={"/login"} className="mx-2">
                <button type="button" className="btn btn-outline-success">
                  Login
                </button>
              </Link>
              <Link to={"/signup"}>
                <button type="button" className="btn btn-outline-success">
                  Signup
                </button>
              </Link>
            </form> : <Link to={"/logout"}>
                <button type="button" onClick={handelLogout} className="btn btn-outline-success">
                  Logout
                </button>
              </Link>}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
