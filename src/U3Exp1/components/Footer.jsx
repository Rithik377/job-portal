import React from "react";
import { BrowserRouter, Link } from "react-router-dom";

function Footer() {

  return (
    <BrowserRouter>
      <footer className="footer">

        <h3>JobPortal</h3>

        <p>
          Find your dream job with JobPortal.
        </p>

        <div>

          <Link to="/">Home</Link>{" | "}

          <Link to="/jobs">Jobs</Link>{" | "}

          <Link to="/saved-jobs">
            Saved Jobs
          </Link>{" | "}

          <Link to="/alerts">
            Alerts
          </Link>{" | "}

          <Link to="/profile">
            Profile
          </Link>

        </div>

        <p>© 2026 JobPortal</p>

      </footer>
    </BrowserRouter>
  );
}

export default Footer;