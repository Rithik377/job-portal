import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";

import { BrowserRouter } from "react-router-dom";
import "./U3Exp1.css";

/* =========================================================
   JOB DATA
========================================================= */

const jobData = [
  {
    id: 101,
    title: "Frontend Developer",
    company: "TechNova Solutions",
    location: "Bangalore",
    salary: 700000,
    industry: "IT",
    experience: "0-2 Years",
    type: "Full Time",
    skills: ["React", "JavaScript", "CSS"],
    description:
      "Develop modern and responsive web applications using React, JavaScript and CSS.",
  },
  {
    id: 102,
    title: "Backend Developer",
    company: "CodeCraft Technologies",
    location: "Chennai",
    salary: 850000,
    industry: "IT",
    experience: "2-4 Years",
    type: "Full Time",
    skills: ["Node.js", "Express", "MongoDB"],
    description:
      "Build scalable backend services, APIs and database solutions.",
  },
  {
    id: 103,
    title: "Cyber Security Analyst",
    company: "SecureNet India",
    location: "Hyderabad",
    salary: 900000,
    industry: "Cyber Security",
    experience: "0-2 Years",
    type: "Full Time",
    skills: ["Nmap", "Linux", "Network Security"],
    description:
      "Monitor security systems, identify vulnerabilities and improve network security.",
  },
  {
    id: 104,
    title: "Data Analyst",
    company: "Insight Analytics",
    location: "Mumbai",
    salary: 650000,
    industry: "Data",
    experience: "0-2 Years",
    type: "Full Time",
    skills: ["Python", "SQL", "Excel"],
    description:
      "Analyze data and create meaningful reports and dashboards for business decisions.",
  },
  {
    id: 105,
    title: "UI/UX Designer",
    company: "Creative Minds",
    location: "Pune",
    salary: 600000,
    industry: "Design",
    experience: "2-4 Years",
    type: "Part Time",
    skills: ["Figma", "UI Design", "UX Research"],
    description:
      "Create attractive and user-friendly interfaces and digital experiences.",
  },
  {
    id: 106,
    title: "Java Developer",
    company: "Enterprise Systems",
    location: "Bangalore",
    salary: 950000,
    industry: "IT",
    experience: "2-4 Years",
    type: "Full Time",
    skills: ["Java", "Spring Boot", "SQL"],
    description:
      "Develop enterprise applications using Java and Spring Boot.",
  },
];

/* =========================================================
   HEADER COMPONENT
========================================================= */

function Header({
  currentPage,
  setCurrentPage,
  savedCount,
}) {
  return (
    <header className="header">
      <div className="logo">
        💼 JobFinder
      </div>

      <nav className="navigation">
        <button
          className={currentPage === "home" ? "active" : ""}
          onClick={() => setCurrentPage("home")}
        >
          Home
        </button>

        <button
          className={currentPage === "jobs" ? "active" : ""}
          onClick={() => setCurrentPage("jobs")}
        >
          Jobs
        </button>

        <button
          className={currentPage === "saved" ? "active" : ""}
          onClick={() => setCurrentPage("saved")}
        >
          Saved ({savedCount})
        </button>

        <button
          className={currentPage === "alerts" ? "active" : ""}
          onClick={() => setCurrentPage("alerts")}
        >
          Alerts
        </button>

        <button
          className={currentPage === "profile" ? "active" : ""}
          onClick={() => setCurrentPage("profile")}
        >
          Profile
        </button>
      </nav>
    </header>
  );
}

/* =========================================================
   SEARCH BAR COMPONENT
========================================================= */

function SearchBar({
  keyword,
  setKeyword,
  searchRef,
}) {
  return (
    <div className="search-box">
      <input
        ref={searchRef}
        type="text"
        value={keyword}
        placeholder="Search job title, company or location..."
        onChange={(event) =>
          setKeyword(event.target.value)
        }
      />

      <button>
        🔍 Search
      </button>
    </div>
  );
}

/* =========================================================
   FILTER PANEL COMPONENT
========================================================= */

function FilterPanel({
  filters,
  setFilters,
}) {
  const updateFilter = (name, value) => {
    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      industry: "All",
      experience: "All",
      type: "All",
      salary: "All",
    });
  };

  return (
    <div className="filter-panel">
      <h2>🎯 Filters</h2>

      <label>Industry</label>

      <select
        value={filters.industry}
        onChange={(event) =>
          updateFilter(
            "industry",
            event.target.value
          )
        }
      >
        <option value="All">All Industries</option>
        <option value="IT">IT</option>
        <option value="Cyber Security">
          Cyber Security
        </option>
        <option value="Data">Data</option>
        <option value="Design">Design</option>
      </select>

      <label>Experience</label>

      <select
        value={filters.experience}
        onChange={(event) =>
          updateFilter(
            "experience",
            event.target.value
          )
        }
      >
        <option value="All">All Experience</option>
        <option value="0-2 Years">
          0-2 Years
        </option>
        <option value="2-4 Years">
          2-4 Years
        </option>
      </select>

      <label>Job Type</label>

      <select
        value={filters.type}
        onChange={(event) =>
          updateFilter(
            "type",
            event.target.value
          )
        }
      >
        <option value="All">All Types</option>
        <option value="Full Time">
          Full Time
        </option>
        <option value="Part Time">
          Part Time
        </option>
      </select>

      <label>Maximum Salary</label>

      <select
        value={filters.salary}
        onChange={(event) =>
          updateFilter(
            "salary",
            event.target.value
          )
        }
      >
        <option value="All">Any Salary</option>
        <option value="600000">₹6 LPA</option>
        <option value="700000">₹7 LPA</option>
        <option value="800000">₹8 LPA</option>
        <option value="1000000">₹10 LPA</option>
      </select>

      <button
        className="clear-button"
        onClick={clearFilters}
      >
        Clear Filters
      </button>
    </div>
  );
}

/* =========================================================
   JOB CARD COMPONENT
========================================================= */

function JobCard({
  job,
  isSaved,
  onSave,
  onRemove,
  onViewDetails,
}) {
  return (
    <div className="job-card">
      <div className="job-logo">
        💼
      </div>

      <div className="job-content">
        <h2>{job.title}</h2>

        <h3>🏢 {job.company}</h3>

        <p>📍 {job.location}</p>

        <p>
          💰 ₹{(job.salary / 100000).toFixed(1)} LPA
        </p>

        <div className="job-tags">
          <span>{job.industry}</span>
          <span>{job.experience}</span>
          <span>{job.type}</span>
        </div>

        <div className="job-actions">
          <button
            className="details-button"
            onClick={() =>
              onViewDetails(job)
            }
          >
            View Details
          </button>

          {isSaved ? (
            <button
              className="saved-button"
              onClick={() =>
                onRemove(job.id)
              }
            >
              ❤️ Saved
            </button>
          ) : (
            <button
              className="save-button"
              onClick={() =>
                onSave(job.id)
              }
            >
              🤍 Save Job
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   JOB LIST COMPONENT
========================================================= */

function JobList({
  jobs,
  savedJobs,
  onSave,
  onRemove,
  onViewDetails,
}) {
  if (jobs.length === 0) {
    return (
      <div className="empty-box">
        <h2>😔 No jobs found</h2>
        <p>
          Try changing your search keywords
          or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          isSaved={savedJobs.includes(job.id)}
          onSave={onSave}
          onRemove={onRemove}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}

/* =========================================================
   JOB DETAIL COMPONENT
========================================================= */

function JobDetail({
  job,
  onBack,
  onApply,
  isSaved,
  onSave,
  onRemove,
}) {
  if (!job) {
    return null;
  }

  return (
    <div className="detail-page">
      <button
        className="back-button"
        onClick={onBack}
      >
        ← Back to Jobs
      </button>

      <div className="detail-card">
        <div className="detail-title">
          <div className="large-job-logo">
            💼
          </div>

          <div>
            <h1>{job.title}</h1>
            <h3>{job.company}</h3>
          </div>
        </div>

        <div className="job-information">
          <p>
            📍 <strong>Location:</strong>{" "}
            {job.location}
          </p>

          <p>
            💰 <strong>Salary:</strong> ₹
            {(job.salary / 100000).toFixed(1)} LPA
          </p>

          <p>
            🏢 <strong>Industry:</strong>{" "}
            {job.industry}
          </p>

          <p>
            🎓 <strong>Experience:</strong>{" "}
            {job.experience}
          </p>

          <p>
            ⏰ <strong>Job Type:</strong>{" "}
            {job.type}
          </p>
        </div>

        <h2>Job Description</h2>

        <p className="description">
          {job.description}
        </p>

        <h2>Required Skills</h2>

        <div className="skills">
          {job.skills.map((skill) => (
            <span key={skill}>
              {skill}
            </span>
          ))}
        </div>

        <div className="detail-actions">
          <button
            className="apply-button"
            onClick={() =>
              onApply(job)
            }
          >
            📝 Apply Now
          </button>

          {isSaved ? (
            <button
              className="saved-button"
              onClick={() =>
                onRemove(job.id)
              }
            >
              ❤️ Remove Saved
            </button>
          ) : (
            <button
              className="save-button"
              onClick={() =>
                onSave(job.id)
              }
            >
              🤍 Save Job
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   APPLICATION FORM COMPONENT
========================================================= */

function ApplicationForm({
  job,
  onBack,
  onSubmit,
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    coverLetter: "",
  });

  const [submitted, setSubmitted] =
    useState(false);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]:
        event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.experience
    ) {
      alert(
        "Please fill all required fields."
      );
      return;
    }

    onSubmit({
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      applicant: form.name,
      email: form.email,
      status: "Applied",
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="success-page">
        <div className="success-card">
          <div className="success-icon">
            ✅
          </div>

          <h1>
            Application Submitted!
          </h1>

          <p>
            Your application for{" "}
            <strong>{job.title}</strong>{" "}
            at{" "}
            <strong>{job.company}</strong>{" "}
            was submitted successfully.
          </p>

          <button
            className="apply-button"
            onClick={onBack}
          >
            ← Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="application-page">
      <button
        className="back-button"
        onClick={onBack}
      >
        ← Back
      </button>

      <div className="application-card">
        <h1>📝 Job Application</h1>

        <div className="application-job">
          <h2>{job.title}</h2>
          <p>
            {job.company} •{" "}
            {job.location}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label>
            Full Name *
          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            placeholder="Enter your full name"
            onChange={handleChange}
          />

          <label>
            Email *
          </label>

          <input
            type="email"
            name="email"
            value={form.email}
            placeholder="Enter your email"
            onChange={handleChange}
          />

          <label>
            Phone Number *
          </label>

          <input
            type="tel"
            name="phone"
            value={form.phone}
            placeholder="Enter phone number"
            onChange={handleChange}
          />

          <label>
            Experience *
          </label>

          <input
            type="text"
            name="experience"
            value={form.experience}
            placeholder="Example: 1 Year"
            onChange={handleChange}
          />

          <label>
            Cover Letter
          </label>

          <textarea
            name="coverLetter"
            value={form.coverLetter}
            placeholder="Write your cover letter..."
            rows="5"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="apply-button full-width"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}

/* =========================================================
   SAVED JOBS COMPONENT
========================================================= */

function SavedJobs({
  jobs,
  savedJobs,
  onRemove,
  onViewDetails,
}) {
  const savedJobList = jobs.filter(
    (job) =>
      savedJobs.includes(job.id)
  );

  return (
    <div className="page-container">
      <h1>❤️ Saved Jobs</h1>

      {savedJobList.length === 0 ? (
        <div className="empty-box">
          <h2>No saved jobs</h2>
          <p>
            Save jobs you are interested in.
          </p>
        </div>
      ) : (
        <div className="job-list">
          {savedJobList.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={true}
              onSave={() => {}}
              onRemove={onRemove}
              onViewDetails={
                onViewDetails
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   JOB ALERTS COMPONENT
========================================================= */

function JobAlerts({
  alerts,
  onCreateAlert,
}) {
  const [alertKeyword, setAlertKeyword] =
    useState("");

  const createAlert = () => {
    if (!alertKeyword.trim()) {
      alert(
        "Please enter a job keyword."
      );
      return;
    }

    onCreateAlert(alertKeyword);

    setAlertKeyword("");
  };

  return (
    <div className="page-container">
      <h1>🔔 Job Alerts</h1>

      <div className="alert-box">
        <input
          type="text"
          value={alertKeyword}
          placeholder="Example: React Developer"
          onChange={(event) =>
            setAlertKeyword(
              event.target.value
            )
          }
        />

        <button
          onClick={createAlert}
        >
          Create Alert
        </button>
      </div>

      {alerts.length === 0 ? (
        <div className="empty-box">
          <h2>
            No job alerts available
          </h2>

          <p>
            Create an alert to track
            suitable jobs.
          </p>
        </div>
      ) : (
        <div className="alerts-list">
          {alerts.map(
            (alert, index) => (
              <div
                className="alert-card"
                key={index}
              >
                <span>
                  🔔 {alert}
                </span>

                <strong>
                  Active
                </strong>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   PROFILE COMPONENT
========================================================= */

function Profile({
  profile,
  updateProfile,
}) {
  const [editing, setEditing] =
    useState(false);

  const [name, setName] =
    useState(profile.name);

  const [email, setEmail] =
    useState(profile.email);

  const [role, setRole] =
    useState(profile.role);

  const saveProfile = () => {
    updateProfile({
      name,
      email,
      role,
    });

    setEditing(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">
          👤
        </div>

        <h1>{profile.name}</h1>

        <p>{profile.role}</p>

        <hr />

        {editing ? (
          <div className="profile-form">
            <label>Name</label>

            <input
              value={name}
              onChange={(event) =>
                setName(
                  event.target.value
                )
              }
            />

            <label>Email</label>

            <input
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
            />

            <label>Role</label>

            <input
              value={role}
              onChange={(event) =>
                setRole(
                  event.target.value
                )
              }
            />

            <button
              className="apply-button"
              onClick={saveProfile}
            >
              Save Profile
            </button>
          </div>
        ) : (
          <div className="profile-information">
            <p>
              📧 <strong>Email:</strong>{" "}
              {profile.email}
            </p>

            <p>
              💼 <strong>Role:</strong>{" "}
              {profile.role}
            </p>

            <button
              className="details-button"
              onClick={() =>
                setEditing(true)
              }
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   HOME COMPONENT
========================================================= */

function Home({
  setCurrentPage,
  keyword,
  setKeyword,
  searchRef,
}) {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>
            Find Your Dream Job 🚀
          </h1>

          <p>
            Search for jobs, save your
            favorites and apply for
            exciting opportunities.
          </p>

          <SearchBar
            keyword={keyword}
            setKeyword={setKeyword}
            searchRef={searchRef}
          />

          <button
            className="explore-button"
            onClick={() =>
              setCurrentPage("jobs")
            }
          >
            Explore Jobs →
          </button>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <span>🔍</span>
          <h3>Easy Search</h3>
          <p>
            Search jobs using keywords,
            companies and locations.
          </p>
        </div>

        <div className="feature-card">
          <span>💼</span>
          <h3>Top Opportunities</h3>
          <p>
            Discover opportunities from
            different industries.
          </p>
        </div>

        <div className="feature-card">
          <span>🚀</span>
          <h3>Build Your Career</h3>
          <p>
            Apply for jobs and take the
            next step in your career.
          </p>
        </div>
      </section>
    </div>
  );
}

/* =========================================================
   FOOTER COMPONENT
========================================================= */

function Footer() {
  return (
    <footer>
      <h2>💼 JobFinder</h2>

      <p>
        Find your dream job and build
        your future.
      </p>

      <p>
        © 2026 JobFinder
      </p>
    </footer>
  );
}

/* =========================================================
   MAIN JOB PORTAL APPLICATION
========================================================= */

function JobPortal() {
  /* -------------------------------------------------------
     useState
  ------------------------------------------------------- */

  const [jobs, setJobs] =
    useState([]);

  const [keyword, setKeyword] =
    useState("");

  const [filters, setFilters] =
    useState({
      industry: "All",
      experience: "All",
      type: "All",
      salary: "All",
    });

  const [selectedJob, setSelectedJob] =
    useState(null);

  const [savedJobs, setSavedJobs] =
    useState([]);

  const [applications, setApplications] =
    useState([]);

  const [alerts, setAlerts] =
    useState([]);

  const [profile, setProfile] =
    useState({
      name: "Rithik",
      email: "rithik@example.com",
      role: "Frontend Developer",
    });

  const [currentPage, setCurrentPage] =
    useState("home");

  /* -------------------------------------------------------
     useRef
  ------------------------------------------------------- */

  const searchRef = useRef(null);

  /* -------------------------------------------------------
     useEffect
     Load job data when application starts
  ------------------------------------------------------- */

  useEffect(() => {
    setJobs(jobData);

    setTimeout(() => {
      if (searchRef.current) {
        searchRef.current.focus();
      }
    }, 100);
  }, []);

  /* -------------------------------------------------------
     useEffect
     Update when search/filter changes
  ------------------------------------------------------- */

  useEffect(() => {
    console.log(
      "Search or filters changed"
    );

    console.log(
      "Keyword:",
      keyword
    );

    console.log(
      "Filters:",
      filters
    );
  }, [keyword, filters]);

  /* -------------------------------------------------------
     useMemo
     Calculate filtered jobs
  ------------------------------------------------------- */

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const search =
        keyword.toLowerCase();

      const matchesKeyword =
        job.title
          .toLowerCase()
          .includes(search) ||
        job.company
          .toLowerCase()
          .includes(search) ||
        job.location
          .toLowerCase()
          .includes(search);

      const matchesIndustry =
        filters.industry === "All" ||
        job.industry ===
          filters.industry;

      const matchesExperience =
        filters.experience === "All" ||
        job.experience ===
          filters.experience;

      const matchesType =
        filters.type === "All" ||
        job.type === filters.type;

      const matchesSalary =
        filters.salary === "All" ||
        job.salary <=
          Number(filters.salary);

      return (
        matchesKeyword &&
        matchesIndustry &&
        matchesExperience &&
        matchesType &&
        matchesSalary
      );
    });
  }, [jobs, keyword, filters]);

  /* -------------------------------------------------------
     useMemo
     Matching jobs
  ------------------------------------------------------- */

  const matchingJobs = useMemo(() => {
    return filteredJobs.length;
  }, [filteredJobs]);

  /* -------------------------------------------------------
     useMemo
     Saved job count
  ------------------------------------------------------- */

  const savedJobCount = useMemo(() => {
    return savedJobs.length;
  }, [savedJobs]);

  /* -------------------------------------------------------
     useMemo
     Application statistics
  ------------------------------------------------------- */

  const applicationStatistics =
    useMemo(() => {
      const total =
        applications.length;

      const applied =
        applications.filter(
          (application) =>
            application.status ===
            "Applied"
        ).length;

      return {
        total,
        applied,
      };
    }, [applications]);

  /* -------------------------------------------------------
     useMemo
     Job alert results
  ------------------------------------------------------- */

  const jobAlertResults = useMemo(() => {
    return alerts.map((alert) => {
      return jobs.filter((job) =>
        job.title
          .toLowerCase()
          .includes(
            alert.toLowerCase()
          )
      );
    });
  }, [alerts, jobs]);

  /* -------------------------------------------------------
     useCallback
     saveJob()
  ------------------------------------------------------- */

  const saveJob = useCallback(
    (jobId) => {
      setSavedJobs((previous) => {
        if (
          previous.includes(jobId)
        ) {
          return previous;
        }

        return [
          ...previous,
          jobId,
        ];
      });
    },
    []
  );

  /* -------------------------------------------------------
     useCallback
     removeSavedJob()
  ------------------------------------------------------- */

  const removeSavedJob =
    useCallback(
      (jobId) => {
        setSavedJobs(
          (previous) =>
            previous.filter(
              (id) => id !== jobId
            )
        );
      },
      []
    );

  /* -------------------------------------------------------
     useCallback
     applyJob()
  ------------------------------------------------------- */

  const applyJob = useCallback(
    (job) => {
      setSelectedJob(job);
      setCurrentPage("apply");
    },
    []
  );

  /* -------------------------------------------------------
     useCallback
     updateProfile()
  ------------------------------------------------------- */

  const updateProfile =
    useCallback(
      (newProfile) => {
        setProfile(newProfile);
      },
      []
    );

  /* -------------------------------------------------------
     useCallback
     createJobAlert()
  ------------------------------------------------------- */

  const createJobAlert =
    useCallback(
      (newAlert) => {
        setAlerts(
          (previous) => [
            ...previous,
            newAlert,
          ]
        );
      },
      []
    );

  /* -------------------------------------------------------
     Submit Application
  ------------------------------------------------------- */

  const submitApplication =
    useCallback(
      (application) => {
        setApplications(
          (previous) => [
            ...previous,
            application,
          ]
        );
      },
      []
    );

  /* -------------------------------------------------------
     View Job Details
  ------------------------------------------------------- */

  const viewJobDetails =
    useCallback((job) => {
      setSelectedJob(job);
      setCurrentPage("detail");
    }, []);

  /* =======================================================
     PAGE CONTENT
  ======================================================= */

  const renderPage = () => {
    if (currentPage === "home") {
      return (
        <Home
          setCurrentPage={
            setCurrentPage
          }
          keyword={keyword}
          setKeyword={setKeyword}
          searchRef={searchRef}
        />
      );
    }

    if (currentPage === "jobs") {
      return (
        <div className="jobs-page">
          <div className="jobs-heading">
            <div>
              <h1>
                Find Jobs
              </h1>

              <p>
                {matchingJobs} matching
                jobs found
              </p>
            </div>

            <div className="statistics">
              📊 Applications:{" "}
              <strong>
                {
                  applicationStatistics.total
                }
              </strong>
            </div>
          </div>

          <SearchBar
            keyword={keyword}
            setKeyword={setKeyword}
            searchRef={searchRef}
          />

          <div className="jobs-layout">
            <FilterPanel
              filters={filters}
              setFilters={setFilters}
            />

            <JobList
              jobs={filteredJobs}
              savedJobs={savedJobs}
              onSave={saveJob}
              onRemove={
                removeSavedJob
              }
              onViewDetails={
                viewJobDetails
              }
            />
          </div>
        </div>
      );
    }

    if (currentPage === "detail") {
      return (
        <JobDetail
          job={selectedJob}
          onBack={() =>
            setCurrentPage("jobs")
          }
          onApply={applyJob}
          isSaved={
            selectedJob
              ? savedJobs.includes(
                  selectedJob.id
                )
              : false
          }
          onSave={saveJob}
          onRemove={
            removeSavedJob
          }
        />
      );
    }

    if (currentPage === "apply") {
      return (
        <ApplicationForm
          job={selectedJob}
          onBack={() =>
            setCurrentPage("jobs")
          }
          onSubmit={
            submitApplication
          }
        />
      );
    }

    if (currentPage === "saved") {
      return (
        <SavedJobs
          jobs={jobs}
          savedJobs={savedJobs}
          onRemove={
            removeSavedJob
          }
          onViewDetails={
            viewJobDetails
          }
        />
      );
    }

    if (currentPage === "alerts") {
      return (
        <JobAlerts
          alerts={alerts}
          onCreateAlert={
            createJobAlert
          }
        />
      );
    }

    if (currentPage === "profile") {
      return (
        <Profile
          profile={profile}
          updateProfile={
            updateProfile
          }
        />
      );
    }

    return null;
  };

  /* =======================================================
     MAIN UI
  ======================================================= */

  return (
    <div className="app">
      <Header
        currentPage={currentPage}
        setCurrentPage={
          setCurrentPage
        }
        savedCount={
          savedJobCount
        }
      />

      <main>
        {renderPage()}
      </main>

      <Footer />

      {/* Used to demonstrate job alert results */}
      {console.log(
        "Job alert results:",
        jobAlertResults
      )}
    </div>
  );
}

/* =========================================================
   BROWSER ROUTER
========================================================= */

function U3Exp1() {
  return (
    <BrowserRouter>
      <JobPortal />
    </BrowserRouter>
  );
}

export default U3Exp1;