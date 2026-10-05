import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import { JobProvider } from "./JobContext";

import Jobs from "./Jobs";
import Profile from "./Profile";

function U3Exp2() {

  return (

    <BrowserRouter>

      <JobProvider>

        <nav>

          <Link to="/jobs">
            Jobs
          </Link>

          {" | "}

          <Link to="/profile">
            Profile
          </Link>

        </nav>

        <Routes>

          <Route
            path="/"
            element={<Jobs />}
          />

          <Route
            path="/jobs"
            element={<Jobs />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

        </Routes>

      </JobProvider>

    </BrowserRouter>
  );
}

export default U3Exp2;