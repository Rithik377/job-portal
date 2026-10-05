import React, { useState } from "react";
import { Link } from "react-router-dom";
import Common from "./Common";

function Dashboard({
  user,
  jobs,
  applications,
  setApplications,
  savedJobs,
  setSavedJobs
}) {

  const [search, setSearch] = useState("");

  const filteredJobs = jobs.filter((job) =>
    `${job.title} ${job.company} ${job.location}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const toggleSave = (id) => {

    if (savedJobs.includes(id)) {

      setSavedJobs(
        savedJobs.filter((jobId) => jobId !== id)
      );

    } else {

      setSavedJobs([
        ...savedJobs,
        id
      ]);

    }
  };

  return (
    <>
      <Common user={user} />

      <main className="dashboard">

        <section className="welcome">

          <div>
            <p className="eyebrow">
              YOUR CAREER DASHBOARD
            </p>

            <h1>
              Good to see you, {user.name.split(" ")[0]} 👋
            </h1>

            <p>
              Find your next opportunity and keep
              track of every application.
            </p>
          </div>

          <Link
            to="/profile"
            className="profile-button"
          >
            View Profile
          </Link>

        </section>

        {/* STATS */}

        <section className="stats">

          <div className="stat-card">
            <div className="stat-icon blue">
              💼
            </div>

            <div>
              <span>Available Jobs</span>
              <strong>{jobs.length}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">
              📝
            </div>

            <div>
              <span>Applications</span>
              <strong>{applications.length}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">
              🔖
            </div>

            <div>
              <span>Saved Jobs</span>
              <strong>{savedJobs.length}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon purple">
              🎯
            </div>

            <div>
              <span>Profile Strength</span>
              <strong>85%</strong>
            </div>
          </div>

        </section>

        <div className="dashboard-grid">

          {/* JOBS */}

          <section className="jobs-section">

            <div className="section-title">

              <div>
                <p className="eyebrow">
                  OPPORTUNITIES
                </p>

                <h2>Recommended Jobs</h2>
              </div>

              <span className="job-count">
                {filteredJobs.length} jobs
              </span>

            </div>

            <div className="search-box">

              <span>⌕</span>

              <input
                type="text"
                placeholder="Search jobs, companies or locations..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

            <div className="job-list">

              {filteredJobs.length === 0 ? (

                <div className="empty">
                  <span>🔍</span>
                  <h3>No jobs found</h3>
                  <p>
                    Try another keyword or location.
                  </p>
                </div>

              ) : (

                filteredJobs.map((job) => {

                  const saved =
                    savedJobs.includes(job.id);

                  return (
                    <div
                      className="premium-job-card"
                      key={job.id}
                    >

                      <div className="job-top">

                        <div className="company-logo">
                          {job.logo}
                        </div>

                        <div className="job-heading">

                          <h3>{job.title}</h3>

                          <p>
                            {job.company}
                          </p>

                        </div>

                        <button
                          className={
                            saved
                              ? "save-btn saved"
                              : "save-btn"
                          }
                          onClick={() =>
                            toggleSave(job.id)
                          }
                        >
                          {saved ? "♥" : "♡"}
                        </button>

                      </div>

                      <div className="job-meta">

                        <span>
                          📍 {job.location}
                        </span>

                        <span>
                          💰 {job.salary}
                        </span>

                        <span>
                          💼 {job.type}
                        </span>

                        <span>
                          🎓 {job.experience}
                        </span>

                      </div>

                      <p className="job-description">
                        {job.description}
                      </p>

                      <div className="job-footer">

                        <span className="category">
                          {job.category}
                        </span>

                        {/* APPLY BUTTON */}

                        <Link
                          to={`/apply/${job.id}`}
                          className="apply-now"
                        >
                          Apply Now →
                        </Link>

                      </div>

                    </div>
                  );
                })
              )}

            </div>

          </section>

          {/* APPLICATION TRACKER */}

          <aside className="tracker">

            <div className="tracker-header">

              <div>
                <p className="eyebrow">
                  YOUR PROGRESS
                </p>

                <h2>Application Tracking</h2>
              </div>

              <span className="live">
                ● LIVE
              </span>

            </div>

            {applications.length === 0 ? (

              <div className="tracker-empty">

                <div className="empty-icon">
                  📋
                </div>

                <h3>No applications yet</h3>

                <p>
                  Apply to a job and your
                  application progress will appear here.
                </p>

                <a href="#jobs">
                  Start applying →
                </a>

              </div>

            ) : (

              <div className="application-list">

                {applications.map((application) => (

                  <div
                    className="tracked-application"
                    key={application.id}
                  >

                    <div className="tracked-title">

                      <div className="mini-logo">
                        {application.company.charAt(0)}
                      </div>

                      <div>
                        <strong>
                          {application.jobTitle}
                        </strong>

                        <span>
                          {application.company}
                        </span>
                      </div>

                    </div>

                    <div className="timeline">

                      <div className="timeline-step done">
                        <span>✓</span>
                        <p>Applied</p>
                      </div>

                      <div className="line"></div>

                      <div className="timeline-step">
                        <span>2</span>
                        <p>Review</p>
                      </div>

                      <div className="line"></div>

                      <div className="timeline-step">
                        <span>3</span>
                        <p>Interview</p>
                      </div>

                      <div className="line"></div>

                      <div className="timeline-step">
                        <span>4</span>
                        <p>Offer</p>
                      </div>

                    </div>

                    <div className="application-status">
                      <span>
                        Current status
                      </span>

                      <strong>
                        {application.status}
                      </strong>
                    </div>

                  </div>

                ))}

              </div>
            )}

          </aside>

        </div>

      </main>
    </>
  );
}

export default Dashboard;