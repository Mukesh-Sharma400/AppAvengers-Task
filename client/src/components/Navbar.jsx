import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import * as actionType from "../constants/actionTypes";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate("/login");
    setUser(null);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("Profile"));
    setUser(storedUser);

    const token = storedUser?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    } // eslint-disable-next-line
  }, [location, dispatch]);

  return (
    <div className="bg-dark fixed-top">
      <header className="container-xxl d-flex flex-wrap justify-content-center py-3">
        <Link
          to="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none text-white"
        >
          <span className="fs-4 nav--bar">App Avengers</span>
        </Link>
        <ul className="nav nav-pills">
          {user ? (
            <div className="d-flex align-items-center">
              <li className="nav-item">
                <p className="m-auto mx-3 text-white fs-4 nav--bar">
                  Welcome, {user?.result.name}
                </p>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={logout}
                >
                  Log Out
                </button>
              </li>
            </div>
          ) : (
            <>
              <li className="nav-item">
                <Link
                  to="/login"
                  type="button"
                  className="btn btn-outline-light me-2"
                >
                  Log In
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" type="button" className="btn btn-warning">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </header>
    </div>
  );
};

export default Navbar;
