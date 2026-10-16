import React, { useState, useEffect, useCallback } from "react";
import {
  JobPortalAPI,
  setForceApiError,
  getForceApiError
} from "./api";
import "./U4Exp1.css";

export default function U4Exp1() {
  // Navigation tabs within Experiment 1
  const [activeTab, setActiveTab] = useState("jobs"); // 'jobs' | 'alerts' | 'applications'

  // Data states
  const [jobs, setJobs] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [applications, setApplications] = useState([]);

  // Selected job for dynamic detail modal (Sub-clause c)
  const [selectedJob, setSelectedJob] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [detailError, setDetailError] = useState(null);

  // Async UI states (Sub-clause e, f)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSimulatingError, setIsSimulatingError] = useState(getForceApiError());

  // Filter states (Sub-clause b)
  const [filters, setFilters] = useState({
    title: "",
    company: "",
    location: "All",
    experience: "All",
    minSalary: ""
  });

  // e & a) Fetch jobs using async/await with REST API
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await JobPortalAPI.getJobs(filters);
      setJobs(response.data);
    } catch (err) {
      setError(err.message || "Failed to fetch jobs from REST API.");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // d) Fetch alerts and applications using APIs
  const fetchAlerts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await JobPortalAPI.getJobAlerts();
      setAlerts(response.data);
    } catch (err) {
      setError(err.message || "Failed to fetch job alerts from API.");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await JobPortalAPI.getApplications();
      setApplications(response.data);
    } catch (err) {
      setError(err.message || "Failed to fetch job applications from API.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Trigger appropriate API call on tab or filter changes
  useEffect(() => {
    if (activeTab === "jobs") {
      fetchJobs();
    } else if (activeTab === "alerts") {
      fetchAlerts();
    } else if (activeTab === "applications") {
      fetchApplications();
    }
  }, [activeTab, fetchJobs, fetchAlerts, fetchApplications]);

  // c) Fetch individual job details dynamically
  const handleViewJobDetails = async (jobId) => {
    setSelectedJob({ id: jobId, title: "Loading details..." });
    setLoadingDetail(true);
    setDetailError(null);
    try {
      const response = await JobPortalAPI.getJobById(jobId);
      setSelectedJob(response.data);
    } catch (err) {
      setDetailError(err.message || "Failed to load individual job details.");
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      title: "",
      company: "",
      location: "All",
      experience: "All",
      minSalary: ""
    });
  };

  // Toggle Error simulation for testing requirements
  const toggleSimulateError = () => {
    const nextState = !isSimulatingError;
    setForceApiError(nextState);
    setIsSimulatingError(nextState);
    if (nextState) {
      fetchJobs();
    }
  };

  return (
    <div className="u4-container">
      {/* Experiment Header */}
      <header className="u4-header">
        <div className="u4-meta-badges">
          <span className="u4-badge">Unit 4 : Experiment 1</span>
          <span className="u4-badge">REST API & Async Data</span>
          <span className="u4-badge">Axios / Fetch Architecture</span>
        </div>
        <h1>Job Portal REST API Integration</h1>
        <p>
          Demonstrates asynchronous job data fetching via REST API, multi-criteria filtering,
          dynamic individual job details inspection, alerts & application status tracking, with robust loading & error handling.
        </p>
      </header>

      {/* Toolbar & Simulation Mode */}
      <section className="u4-toolbar">
        <div className="u4-tab-group">
          <button
            className={`u4-tab-btn ${activeTab === "jobs" ? "active" : ""}`}
            onClick={() => setActiveTab("jobs")}
          >
            💼 Explore Jobs ({jobs.length})
          </button>
          <button
            className={`u4-tab-btn ${activeTab === "alerts" ? "active" : ""}`}
            onClick={() => setActiveTab("alerts")}
          >
            🔔 Job Alerts ({alerts.length})
          </button>
          <button
            className={`u4-tab-btn ${activeTab === "applications" ? "active" : ""}`}
            onClick={() => setActiveTab("applications")}
          >
            📄 My Applications ({applications.length})
          </button>
        </div>

        {/* Error Simulation Toggle to verify Requirement (f) */}
        <div className="u4-sim-switch">
          <span>Simulate API Error:</span>
          <button
            className={`u4-toggle-btn ${
              isSimulatingError ? "btn-sim-on" : "btn-sim-off"
            }`}
            onClick={toggleSimulateError}
            title="Click to toggle simulated HTTP 500 error for testing error states"
          >
            {isSimulatingError ? "🔴 Error Active (500)" : "🟢 Normal (200 OK)"}
          </button>
        </div>
      </section>

      {/* Tab 1: JOBS WITH MULTI-FIELD FILTERS */}
      {activeTab === "jobs" && (
        <>
          {/* b) Filter Panel */}
          <div className="u4-filter-box">
            <h3>🔍 Multi-Criteria Job Filters</h3>
            <div className="u4-filter-grid">
              <div className="u4-filter-field">
                <label>Job Title or Skill</label>
                <input
                  type="text"
                  placeholder="e.g. React, Developer, Python..."
                  value={filters.title}
                  onChange={(e) => handleFilterChange("title", e.target.value)}
                />
              </div>

              <div className="u4-filter-field">
                <label>Company</label>
                <input
                  type="text"
                  placeholder="e.g. Google, TCS, Microsoft..."
                  value={filters.company}
                  onChange={(e) =>
                    handleFilterChange("company", e.target.value)
                  }
                />
              </div>

              <div className="u4-filter-field">
                <label>Location</label>
                <select
                  value={filters.location}
                  onChange={(e) =>
                    handleFilterChange("location", e.target.value)
                  }
                >
                  <option value="All">All Locations</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Mumbai">Mumbai</option>
                </select>
              </div>

              <div className="u4-filter-field">
                <label>Experience</label>
                <select
                  value={filters.experience}
                  onChange={(e) =>
                    handleFilterChange("experience", e.target.value)
                  }
                >
                  <option value="All">All Levels</option>
                  <option value="Fresher">Fresher</option>
                  <option value="1-3 Years">1-3 Years</option>
                  <option value="2-4 Years">2-4 Years</option>
                  <option value="3-5 Years">3-5 Years</option>
                </select>
              </div>

              <div className="u4-filter-field">
                <label>Min Salary (INR)</label>
                <input
                  type="number"
                  placeholder="e.g. 1000000"
                  step="100000"
                  value={filters.minSalary}
                  onChange={(e) =>
                    handleFilterChange("minSalary", e.target.value)
                  }
                />
              </div>

              <button className="u4-btn-reset" onClick={handleResetFilters}>
                🔄 Reset Filters
              </button>
            </div>
          </div>

          {/* Loading State (f) */}
          {loading && (
            <div className="u4-loader-box">
              <div className="u4-spinner"></div>
              <p>Fetching jobs asynchronously via REST API...</p>
            </div>
          )}

          {/* Error State (f) */}
          {error && !loading && (
            <div className="u4-error-box">
              <h4>⚠️ API Request Failed</h4>
              <p>{error}</p>
              <button className="u4-btn-retry" onClick={fetchJobs}>
                🔄 Retry API Request
              </button>
            </div>
          )}

          {/* Jobs Grid (a) */}
          {!loading && !error && (
            <>
              {jobs.length === 0 ? (
                <div className="u4-loader-box">
                  <p>No jobs found matching the selected filter criteria.</p>
                </div>
              ) : (
                <div className="u4-grid">
                  {jobs.map((job) => (
                    <article key={job.id} className="u4-job-card">
                      <div>
                        <div className="u4-card-top">
                          <div className="u4-company-avatar">{job.logo}</div>
                          <div className="u4-card-info">
                            <h4>{job.title}</h4>
                            <span className="u4-company-name">
                              {job.company} • {job.location}
                            </span>
                          </div>
                        </div>

                        <div className="u4-card-tags">
                          <span className="u4-tag u4-tag-salary">
                            {job.salaryFormatted}
                          </span>
                          <span className="u4-tag">{job.experience}</span>
                          <span className="u4-tag">{job.type}</span>
                        </div>

                        <div className="u4-card-skills">
                          {job.skills.map((skill, idx) => (
                            <span key={idx} className="u4-skill-pill">
                              {skill}
                            </span>
                          ))}
                        </div>

                        <p
                          style={{
                            fontSize: "0.85rem",
                            color: "#475569",
                            lineHeight: "1.5",
                            marginBottom: "16px"
                          }}
                        >
                          {job.description}
                        </p>
                      </div>

                      <div className="u4-card-actions">
                        {/* c) Fetch dynamic job details on click */}
                        <button
                          className="u4-btn-view"
                          onClick={() => handleViewJobDetails(job.id)}
                        >
                          👁️ View Full Details
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* Tab 2: d) JOB ALERTS RETRIEVED VIA API */}
      {activeTab === "alerts" && (
        <section>
          {loading && (
            <div className="u4-loader-box">
              <div className="u4-spinner"></div>
              <p>Retrieving job notification alerts from API...</p>
            </div>
          )}

          {error && !loading && (
            <div className="u4-error-box">
              <h4>⚠️ Failed to load alerts</h4>
              <p>{error}</p>
              <button className="u4-btn-retry" onClick={fetchAlerts}>
                🔄 Retry
              </button>
            </div>
          )}

          {!loading && !error && (
            <div className="u4-list-container">
              {alerts.map((alt) => (
                <div key={alt.id} className="u4-list-item">
                  <div>
                    <h4 style={{ margin: "0 0 4px 0", color: "#0f172a" }}>
                      🎯 Alert for: &quot;{alt.keyword}&quot; ({alt.location})
                    </h4>
                    <span style={{ fontSize: "0.82rem", color: "#64748b" }}>
                      Created on: {alt.created} • Frequency: {alt.frequency}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <span style={{ fontWeight: 600, color: "#4f46e5" }}>
                      {alt.matchesCount} New Matches
                    </span>
                    <span
                      className={`u4-status-badge ${
                        alt.active ? "scheduled" : "review"
                      }`}
                    >
                      {alt.active ? "Active" : "Paused"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Tab 3: d) APPLICATION INFORMATION RETRIEVED VIA API */}
      {activeTab === "applications" && (
        <section>
          {loading && (
            <div className="u4-loader-box">
              <div className="u4-spinner"></div>
              <p>Fetching application tracking status via API...</p>
            </div>
          )}

          {error && !loading && (
            <div className="u4-error-box">
              <h4>⚠️ Failed to load applications</h4>
              <p>{error}</p>
              <button className="u4-btn-retry" onClick={fetchApplications}>
                🔄 Retry
              </button>
            </div>
          )}

          {!loading && !error && (
            <div className="u4-list-container">
              {applications.map((app) => (
                <div key={app.id} className="u4-list-item">
                  <div>
                    <h4 style={{ margin: "0 0 4px 0", color: "#0f172a" }}>
                      {app.jobTitle}
                    </h4>
                    <span style={{ fontSize: "0.85rem", color: "#475569" }}>
                      {app.company} • Applied on {app.appliedDate}
                    </span>
                    <p style={{ margin: "6px 0 0 0", fontSize: "0.82rem", color: "#64748b" }}>
                      📌 Current Stage: <strong>{app.stage}</strong> — {app.notes}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`u4-status-badge ${
                        app.status === "Interview Scheduled" ? "scheduled" : "review"
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* c) DYNAMIC JOB DETAIL MODAL (ASYNC FETCH) */}
      {selectedJob && (
        <div className="u4-modal-overlay" onClick={() => setSelectedJob(null)}>
          <div className="u4-modal" onClick={(e) => e.stopPropagation()}>
            <div className="u4-modal-header">
              <h3>{selectedJob.title}</h3>
              <button
                className="u4-close-btn"
                onClick={() => setSelectedJob(null)}
              >
                ✕
              </button>
            </div>

            <div className="u4-modal-body">
              {loadingDetail ? (
                <div className="u4-loader-box">
                  <div className="u4-spinner"></div>
                  <p>Fetching dynamic job metadata from REST API endpoint...</p>
                </div>
              ) : detailError ? (
                <div className="u4-error-box">
                  <p>{detailError}</p>
                  <button
                    className="u4-btn-retry"
                    onClick={() => handleViewJobDetails(selectedJob.id)}
                  >
                    Retry Detail Fetch
                  </button>
                </div>
              ) : (
                <>
                  <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
                    <span className="u4-tag u4-tag-salary">{selectedJob.salaryFormatted}</span>
                    <span className="u4-tag">{selectedJob.company}</span>
                    <span className="u4-tag">{selectedJob.location}</span>
                    <span className="u4-tag">{selectedJob.experience}</span>
                  </div>

                  <h4>Description</h4>
                  <p>{selectedJob.description}</p>

                  {selectedJob.responsibilities && (
                    <>
                      <h4>Key Responsibilities</h4>
                      <ul>
                        {selectedJob.responsibilities.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  <h4>Required Skills</h4>
                  <div className="u4-card-skills">
                    {selectedJob.skills?.map((s, idx) => (
                      <span key={idx} className="u4-skill-pill">
                        {s}
                      </span>
                    ))}
                  </div>

                  <p style={{ marginTop: "16px", color: "#64748b", fontSize: "0.8rem" }}>
                    REST API ID: <code>{selectedJob.id}</code> • Category: {selectedJob.category}
                  </p>
                </>
              )}
            </div>

            <div className="u4-modal-footer">
              <button
                className="u4-btn-reset"
                onClick={() => setSelectedJob(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
