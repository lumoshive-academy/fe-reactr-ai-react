import React from "react";
import { logout } from "../utils/api";

const Navbar = ({ setToken }) => {
  const handleLogout = () => {
    logout()
      .then(() => {
        localStorage.removeItem("token");
        setToken(null);
      })
      .catch((error) => console.error("Logout failed", error));
  };

  return (
    <div className="bg-primary border-bottom shadow-sm sticky-top text-white">
      <div className="container">
        <nav className="navbar navbar-primary">
          <span className="navbar-brand mb-0 h1 text-white">
            <i className="bi bi-robot"></i> LumoshiveAI
          </span>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout <i className="bi bi-box-arrow-in-right"></i>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
