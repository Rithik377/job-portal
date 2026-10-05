import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./Home";
import Auth from "./Auth";
import Dashboard from "./Dashboard";
import Application from "./Application";
import Profile from "./Profile";

import "./U3Exp4.css";

export const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TCS",
    location: "Chennai",
    salary: "₹5 - 8 LPA",
    type: "Full Time",
    experience: "Fresher",
    category: "Software Development",
    logo: "T",
    description:
      "Build modern and responsive web applications using React, JavaScript, HTML and CSS."
  },
  {
    id: 2,
    title: "Cyber Security Analyst",
    company: "Wipro",
    location: "Bangalore",
    salary: "₹6 - 10 LPA",
    type: "Full Time",
    experience: "1-2 Years",
    category: "Cyber Security",
    logo: "W",
    description:
      "Monitor security systems, investigate threats and help protect company infrastructure."
  },
  {
    id: 3,
    title: "Python Developer",
    company: "Infosys",
    location: "Hyderabad",
    salary: "₹5 - 9 LPA",
    type: "Full Time",
    experience: "Fresher",
    category: "Software Development",
    logo: "I",
    description:
      "Develop applications using Python, APIs, databases and modern development tools."
  },
  {
    id: 4,
    title: "Security Engineer",
    company: "Accenture",
    location: "Mumbai",
    salary: "₹7 - 12 LPA",
    type: "Full Time",
    experience: "1-3 Years",
    category: "Cyber Security",
    logo: "A",
    description:
      "Design, implement and maintain security solutions for enterprise applications."
  }
];

function U3Exp4() {
  const [user, setUser] = useState(null);

  const [applications, setApplications] = useState([]);

  const [savedJobs, setSavedJobs] = useState([]);

  return (
    <Routes>

      <Route
        path="/"
        element={
          <Home user={user} />
        }
      />

      <Route
        path="/login"
        element={
          <Auth setUser={setUser} />
        }
      />

      <Route
        path="/dashboard"
        element={
          user ? (
            <Dashboard
              user={user}
              jobs={jobs}
              applications={applications}
              setApplications={setApplications}
              savedJobs={savedJobs}
              setSavedJobs={setSavedJobs}
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/apply/:id"
        element={
          user ? (
            <Application
              user={user}
              jobs={jobs}
              applications={applications}
              setApplications={setApplications}
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/profile"
        element={
          user ? (
            <Profile
              user={user}
              applications={applications}
              savedJobs={savedJobs}
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="*"
        element={<Navigate to="/" />}
      />

    </Routes>
  );
}

export default U3Exp4;