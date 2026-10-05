import React from "react";
import { Link, useLocation } from "react-router-dom";

function Common({ user }) {
  const location = useLocation();

  return (
    <header className="navbar">

      <Link to="/" className="brand">
        <span className="brand-icon">J</span>

        <div>
          <strong>Jobify</strong>
          <small>Career Platform</small>
        </div>
      </Link>

      <nav className="nav-links">

        <Link
          className={location.pathname === "/" ? "active" : ""}
          to="/"
        >
          Home
        </Link>

        {user && (
          <>
            <Link
              className={
                location.pathname === "/dashboard"
                  ? "active"
                  : ""
              }
              to="/dashboard"
            >
              Find Jobs
            </Link>

            <Link
              className={
                location.pathname === "/profile"
                  ? "active"
                  : ""
              }
              to="/profile"
            >
              Profile
            </Link>
          </>
        )}

      </nav>

      <div className="nav-right">

        {user ? (
          <div className="user-mini">
            <div className="avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <span>{user.name}</span>
          </div>
        ) : (
          <Link to="/login" className="login-btn">
            Sign In
          </Link>
        )}

      </div>

    </header>
  );
}

export default Common;