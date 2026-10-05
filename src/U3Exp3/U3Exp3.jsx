import React, { useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useParams,
  useNavigate,
  Outlet
} from "react-router-dom";

import "./U3Exp3.css";

const jobs = [
  {
    id: 101,
    title: "React Developer",
    company: "TCS",
    location: "Chennai",
    salary: "6 LPA",
    industry: "IT",
    experience: "0-2 Years",
    type: "Full Time",
    description: "Develop and maintain React applications.",
    skills: "React, JavaScript, HTML, CSS"
  },
  {
    id: 102,
    title: "Cyber Security Analyst",
    company: "Infosys",
    location: "Bangalore",
    salary: "8 LPA",
    industry: "Cyber Security",
    experience: "2-4 Years",
    type: "Full Time",
    description: "Monitor systems and identify cyber security threats.",
    skills: "Linux, Networking, SIEM, Security"
  },
  {
    id: 103,
    title: "Data Analyst",
    company: "Zoho",
    location: "Chennai",
    salary: "5 LPA",
    industry: "Data",
    experience: "0-2 Years",
    type: "Internship",
    description: "Analyze data and prepare useful reports.",
    skills: "Python, SQL, Excel, Data Analysis"
  }
];

function Navbar() {

  return (
    <nav>

      <Link to="/">Job Portal</Link>{" | "}

      <NavLink to="/jobs">Jobs</NavLink>{" | "}

      <NavLink to="/saved-jobs">Saved Jobs</NavLink>{" | "}

      <NavLink to="/applications">Applications</NavLink>{" | "}

      <NavLink to="/alerts">Alerts</NavLink>{" | "}

      <NavLink to="/profile">Profile</NavLink>{" | "}

      <NavLink to="/dashboard">Dashboard</NavLink>{" | "}

      <NavLink to="/login">Login</NavLink>

    </nav>
  );
}


function Home() {

  return (
    <div>

      <h1>Job Portal</h1>

      <p>Find your dream job easily.</p>

      <Link to="/jobs">
        View Jobs
      </Link>

    </div>
  );
}


function Jobs() {

  return (
    <div>

      <h1>Available Jobs</h1>

      {jobs.map(job => (

        <div className="job-card" key={job.id}>

          <h2>{job.title}</h2>

          <p>Company: {job.company}</p>

          <p>Location: {job.location}</p>

          <p>Salary: {job.salary}</p>

          <Link to={`/job/${job.id}`}>
            View Details
          </Link>

        </div>

      ))}

    </div>
  );
}


function JobDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const job = jobs.find(
    item => item.id === Number(id)
  );

  if (!job) {
    return <h2>Job not found</h2>;
  }

  return (
    <div>

      <h1>{job.title}</h1>

      <p>Company: {job.company}</p>

      <p>Location: {job.location}</p>

      <p>Salary: {job.salary}</p>

      <p>Industry: {job.industry}</p>

      <p>Experience Level: {job.experience}</p>

      <p>Job Type: {job.type}</p>

      <p>Job Description: {job.description}</p>

      <p>Required Skills: {job.skills}</p>

      <button
        onClick={() =>
          navigate(`/apply/${job.id}`)
        }
      >
        Apply Now
      </button>

    </div>
  );
}


function Apply() {

  const { id } = useParams();

  const navigate = useNavigate();

  const job = jobs.find(
    item => item.id === Number(id)
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    resume: "",
    coverLetter: ""
  });

  const [error, setError] = useState("");

  const change = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const submit = (e) => {

    e.preventDefault();

    if (
      form.name === "" ||
      form.email === "" ||
      form.phone === "" ||
      form.resume === "" ||
      form.coverLetter === ""
    ) {

      setError("Please fill all fields");

      return;
    }

    navigate(`/apply/${id}/review`);
  };

  return (
    <div>

      <h1>Application Form</h1>

      <h3>{job?.title}</h3>

      <form onSubmit={submit}>

        <input
          name="name"
          placeholder="Applicant Name"
          value={form.name}
          onChange={change}
        />

        <br /><br />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={change}
        />

        <br /><br />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={change}
        />

        <br /><br />

        <input
          name="resume"
          placeholder="Resume"
          value={form.resume}
          onChange={change}
        />

        <br /><br />

        <textarea
          name="coverLetter"
          placeholder="Cover Letter"
          value={form.coverLetter}
          onChange={change}
        />

        <br /><br />

        {error && <p>{error}</p>}

        <button type="submit">
          Review Application
        </button>

      </form>

    </div>
  );
}


function ApplicationReview() {

  const { id } = useParams();

  const navigate = useNavigate();

  return (
    <div>

      <h1>Application Review</h1>

      <p>Job ID: {id}</p>

      <p>Applicant details entered successfully.</p>

      <p>Resume and Cover Letter added.</p>

      <button
        onClick={() =>
          navigate(`/apply/${id}/confirmation`)
        }
      >
        Confirm Application
      </button>

    </div>
  );
}


function ApplicationConfirmation() {

  const navigate = useNavigate();

  return (
    <div>

      <h1>Application Confirmation</h1>

      <p>
        Your application has been successfully submitted.
      </p>

      <button
        onClick={() =>
          navigate("/applications")
        }
      >
        View Applications
      </button>

    </div>
  );
}


function SavedJobs() {

  return (
    <div>

      <h1>Saved Jobs</h1>

      <p>No saved jobs</p>

    </div>
  );
}


function Applications() {

  return (
    <div>

      <h1>Applications</h1>

      <p>No applications submitted</p>

    </div>
  );
}


function Alerts() {

  return (
    <div>

      <h1>Job Alerts</h1>

      <p>No job alerts available</p>

    </div>
  );
}


function Profile() {

  return (
    <div>

      <h1>Profile</h1>

      <p>Name: Applicant</p>

      <p>Email: applicant@gmail.com</p>

    </div>
  );
}


function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const login = (e) => {

    e.preventDefault();

    if (email === "") {

      alert("Enter email");

      return;
    }

    navigate("/dashboard");

  };

  return (
    <div>

      <h1>Login</h1>

      <form onSubmit={login}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e =>
            setEmail(e.target.value)
          }
        />

        <br /><br />

        <button type="submit">
          Login
        </button>

      </form>

    </div>
  );
}


function Dashboard() {

  return (
    <div>

      <h1>Applicant Dashboard</h1>

      <nav>

        <NavLink to="/dashboard/applications">
          Applications
        </NavLink>{" | "}

        <NavLink to="/dashboard/saved-jobs">
          Saved Jobs
        </NavLink>{" | "}

        <NavLink to="/dashboard/job-alerts">
          Job Alerts
        </NavLink>{" | "}

        <NavLink to="/dashboard/profile">
          Profile
        </NavLink>

      </nav>

      <hr />

      <Outlet />

    </div>
  );
}


function DashboardApplications() {

  return (
    <div>

      <h2>Dashboard Applications</h2>

      <p>No applications submitted</p>

    </div>
  );
}


function DashboardSavedJobs() {

  return (
    <div>

      <h2>Dashboard Saved Jobs</h2>

      <p>No saved jobs</p>

    </div>
  );
}


function DashboardAlerts() {

  return (
    <div>

      <h2>Dashboard Job Alerts</h2>

      <p>No job alerts available</p>

    </div>
  );
}


function DashboardProfile() {

  return (
    <div>

      <h2>Dashboard Profile</h2>

      <p>Name: Applicant</p>

      <p>Email: applicant@gmail.com</p>

    </div>
  );
}


function U3Exp3() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/jobs"
          element={<Jobs />}
        />

        <Route
          path="/job/:id"
          element={<JobDetails />}
        />

        <Route
          path="/apply/:id"
          element={<Apply />}
        />

        <Route
          path="/apply/:id/review"
          element={<ApplicationReview />}
        />

        <Route
          path="/apply/:id/confirmation"
          element={<ApplicationConfirmation />}
        />

        <Route
          path="/saved-jobs"
          element={<SavedJobs />}
        />

        <Route
          path="/applications"
          element={<Applications />}
        />

        <Route
          path="/alerts"
          element={<Alerts />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        >

          <Route
            path="applications"
            element={<DashboardApplications />}
          />

          <Route
            path="saved-jobs"
            element={<DashboardSavedJobs />}
          />

          <Route
            path="job-alerts"
            element={<DashboardAlerts />}
          />

          <Route
            path="profile"
            element={<DashboardProfile />}
          />

        </Route>

      </Routes>

    </BrowserRouter>

  );
}

export default U3Exp3;