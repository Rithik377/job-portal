import React from "react";
import { BrowserRouter, NavLink } from "react-router-dom";

function Header({ savedCount }) {
  return (
    <BrowserRouter>
      <header className="header">
        <h2>JobPortal</h2>

        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/jobs">Jobs</NavLink>

          <NavLink to="/saved-jobs">
            Saved Jobs ({savedCount})
          </NavLink>

          <NavLink to="/alerts">Alerts</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </nav>
      </header>
    </BrowserRouter>
  );
}

export default Header;