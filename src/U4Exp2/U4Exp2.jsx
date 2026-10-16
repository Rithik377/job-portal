import { useState, useMemo } from "react";
import { useJobPortalStore } from "./store";
import "./U4Exp2.css";

export default function U4Exp2() {
  // Global Store Access
  const {
    jobs,
    savedJobIds,
    applications,
    alerts,
    profile,
    cache,
    lastQueryMetrics,
    actionLogs,
    saveJob,
    removeSavedJob,
    applyJob,
    withdrawApplication,
    addAlert,
    removeAlert,
    updateProfile,
    searchJobsWithCache,
    clearCache,
    clearActionLogs
  } = useJobPortalStore();

  const [activeTab, setActiveTab] = useState("jobs"); // 'jobs' | 'saved' | 'applications' | 'alerts' | 'profile'

  // Search & Cache query inputs
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");

  // New alert form inputs
  const [alertKeyword, setAlertKeyword] = useState("");
  const [alertLocation, setAlertLocation] = useState("Bangalore");

  // Profile form state initialized from store profile
  const [profileForm, setProfileForm] = useState(profile);
  const [profileSavedMsg, setProfileSavedMsg] = useState("");

  // Derived filtered jobs via cached search (Sub-clause f)
  const filteredJobs = useMemo(() => {
    return searchJobsWithCache(searchQuery, selectedLocation);
  }, [searchQuery, selectedLocation, searchJobsWithCache, jobs]);

  const handleToggleSave = (jobId) => {
    if (savedJobIds.includes(jobId)) {
      removeSavedJob(jobId);
    } else {
      saveJob(jobId);
    }
  };

  const handleAddAlertSubmit = (e) => {
    e.preventDefault();
    if (!alertKeyword.trim()) return;
    addAlert(alertKeyword, alertLocation);
    setAlertKeyword("");
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
    setProfileSavedMsg("✅ Profile successfully updated in global store!");
    setTimeout(() => setProfileSavedMsg(""), 3000);
  };

  // Helper to check application status
  const getApplicationForJob = (jobId) => {
    return applications.find((a) => a.jobId === jobId);
  };

  const savedJobsList = jobs.filter((j) => savedJobIds.includes(j.id));

  return (
    <div className="u4-exp2-container">
      {/* Header */}
      <header className="u4-exp2-header">
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
          <span style={{ background: "rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 600 }}>
            Unit 4 : Experiment 2
          </span>
          <span style={{ background: "rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 600 }}>
            Zustand Global Store
          </span>
          <span style={{ background: "rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 600 }}>
            Action Monitoring Middleware & Caching
          </span>
        </div>
        <h1>Job Portal State Management & Middleware</h1>
        <p>
          Centralized global state with Zustand, full action logging middleware,
          query caching with TTL, and complete CRUD state operations.
        </p>
      </header>

      {/* Main Grid: Application Views + Live Middleware Inspector */}
      <div className="u4-main-layout">
        <div>
          {/* Tabs */}
          <nav className="u4-nav-tabs">
            <button
              className={`u4-nav-tab-btn ${activeTab === "jobs" ? "active" : ""}`}
              onClick={() => setActiveTab("jobs")}
            >
              💼 All Jobs ({filteredJobs.length})
            </button>
            <button
              className={`u4-nav-tab-btn ${activeTab === "saved" ? "active" : ""}`}
              onClick={() => setActiveTab("saved")}
            >
              ⭐ Saved Jobs ({savedJobIds.length})
            </button>
            <button
              className={`u4-nav-tab-btn ${activeTab === "applications" ? "active" : ""}`}
              onClick={() => setActiveTab("applications")}
            >
              📄 Applications ({applications.length})
            </button>
            <button
              className={`u4-nav-tab-btn ${activeTab === "alerts" ? "active" : ""}`}
              onClick={() => setActiveTab("alerts")}
            >
              🔔 Alerts ({alerts.length})
            </button>
            <button
              className={`u4-nav-tab-btn ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              👤 Profile Store
            </button>
          </nav>

          {/* TAB 1: ALL JOBS WITH CACHED SEARCH */}
          {activeTab === "jobs" && (
            <div>
              {/* f) Caching Search Bar */}
              <div className="u4-cache-search-bar">
                <div className="u4-cache-search-inputs">
                  <input
                    type="text"
                    placeholder="Search by title, company, or skills (Cached Query)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    <option value="All">All Locations</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Chennai">Chennai</option>
                  </select>
                </div>

                <div className="u4-cache-status-pill">
                  <span>
                    Query Status:{" "}
                    <strong
                      className={
                        lastQueryMetrics.source.includes("HIT")
                          ? "u4-badge-hit"
                          : "u4-badge-miss"
                      }
                    >
                      {lastQueryMetrics.source}
                    </strong>{" "}
                    ({lastQueryMetrics.responseTime})
                  </span>
                  <button
                    onClick={clearCache}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#dc2626",
                      fontSize: "0.78rem",
                      cursor: "pointer",
                      textDecoration: "underline"
                    }}
                  >
                    Invalidate Cache
                  </button>
                </div>
              </div>

              {/* Jobs List */}
              {filteredJobs.map((job) => {
                const isSaved = savedJobIds.includes(job.id);
                const app = getApplicationForJob(job.id);

                return (
                  <div key={job.id} className="u4-store-job-card">
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <div>
                        <h3 style={{ margin: "0 0 4px 0", color: "#0f172a", fontSize: "1.1rem" }}>
                          {job.title}
                        </h3>
                        <span style={{ color: "#64748b", fontSize: "0.86rem" }}>
                          {job.company} • {job.location} • <strong>{job.salary}</strong>
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: "8px" }}>
                        {/* c) Save/Remove Operation */}
                        <button
                          className={`u4-btn-action u4-btn-save ${isSaved ? "saved" : ""}`}
                          onClick={() => handleToggleSave(job.id)}
                        >
                          {isSaved ? "★ Saved" : "☆ Save"}
                        </button>

                        {/* c) Apply Operation */}
                        {app ? (
                          <button className="u4-btn-action u4-btn-applied">
                            ✓ Applied
                          </button>
                        ) : (
                          <button
                            className="u4-btn-action u4-btn-apply"
                            onClick={() => applyJob(job.id, "Instant Application via Store")}
                          >
                            Apply Now
                          </button>
                        )}
                      </div>
                    </div>
                    <p style={{ margin: "6px 0 10px 0", fontSize: "0.85rem", color: "#475569" }}>
                      {job.description}
                    </p>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {job.skills.map((s, i) => (
                        <span
                          key={i}
                          style={{
                            background: "#f1f5f9",
                            color: "#334155",
                            fontSize: "0.74rem",
                            padding: "2px 8px",
                            borderRadius: "4px"
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: SAVED JOBS */}
          {activeTab === "saved" && (
            <div>
              {savedJobsList.length === 0 ? (
                <div style={{ background: "#ffffff", padding: "40px", textAlign: "center", borderRadius: "12px", border: "1px dashed #cbd5e1" }}>
                  <p>No saved jobs in store. Click &quot;☆ Save&quot; on any job to bookmark it.</p>
                </div>
              ) : (
                savedJobsList.map((job) => (
                  <div key={job.id} className="u4-store-job-card">
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div>
                        <h3 style={{ margin: "0 0 4px 0" }}>{job.title}</h3>
                        <p style={{ margin: 0, color: "#64748b", fontSize: "0.85rem" }}>
                          {job.company} • {job.location} • {job.salary}
                        </p>
                      </div>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          className="u4-btn-action u4-btn-withdraw"
                          onClick={() => removeSavedJob(job.id)}
                        >
                          Remove from Saved
                        </button>
                        {!getApplicationForJob(job.id) && (
                          <button
                            className="u4-btn-action u4-btn-apply"
                            onClick={() => applyJob(job.id, "Applied from Saved Jobs")}
                          >
                            Apply Now
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: APPLICATIONS WITH WITHDRAW */}
          {activeTab === "applications" && (
            <div>
              {applications.length === 0 ? (
                <div style={{ background: "#ffffff", padding: "40px", textAlign: "center", borderRadius: "12px", border: "1px dashed #cbd5e1" }}>
                  <p>You have not applied to any jobs yet.</p>
                </div>
              ) : (
                applications.map((app) => (
                  <div key={app.id} className="u4-store-job-card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <h3 style={{ margin: "0 0 4px 0" }}>{app.jobTitle}</h3>
                        <p style={{ margin: "0 0 4px 0", color: "#475569", fontSize: "0.85rem" }}>
                          {app.company} • Applied: {app.appliedAt}
                        </p>
                        <span style={{ fontSize: "0.8rem", color: "#059669", background: "#ecfdf5", padding: "3px 8px", borderRadius: "4px" }}>
                          Status: {app.status}
                        </span>
                      </div>
                      {/* c) Withdraw Operation */}
                      <button
                        className="u4-btn-action u4-btn-withdraw"
                        onClick={() => withdrawApplication(app.id)}
                      >
                        Withdraw Application
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 4: JOB ALERTS WITH ADD & REMOVE */}
          {activeTab === "alerts" && (
            <div>
              <form
                onSubmit={handleAddAlertSubmit}
                style={{
                  background: "#ffffff",
                  padding: "16px",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  marginBottom: "20px",
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-end"
                }}
              >
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>
                    Job Keyword
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Cloud Engineer, Cyber..."
                    value={alertKeyword}
                    onChange={(e) => setAlertKeyword(e.target.value)}
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>
                    Location
                  </label>
                  <select
                    value={alertLocation}
                    onChange={(e) => setAlertLocation(e.target.value)}
                    style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                  >
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Chennai">Chennai</option>
                  </select>
                </div>
                <button
                  type="submit"
                  style={{
                    padding: "9px 18px",
                    background: "#4f46e5",
                    color: "#ffffff",
                    borderRadius: "6px",
                    border: "none",
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  + Add Alert
                </button>
              </form>

              {alerts.map((alt) => (
                <div key={alt.id} className="u4-store-job-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <h4 style={{ margin: "0 0 2px 0" }}>🔔 &quot;{alt.keyword}&quot;</h4>
                    <span style={{ fontSize: "0.82rem", color: "#64748b" }}>
                      Location: {alt.location} • Created: {alt.createdAt}
                    </span>
                  </div>
                  <button
                    className="u4-btn-action u4-btn-withdraw"
                    onClick={() => removeAlert(alt.id)}
                  >
                    Delete Alert
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: PROFILE INFORMATION STORE */}
          {activeTab === "profile" && (
            <div className="u4-profile-card">
              <h3 style={{ margin: "0 0 16px 0", color: "#0f172a" }}>👤 Candidate Profile Store</h3>
              {profileSavedMsg && (
                <div style={{ background: "#dcfce7", color: "#166534", padding: "10px", borderRadius: "8px", marginBottom: "14px", fontSize: "0.88rem" }}>
                  {profileSavedMsg}
                </div>
              )}
              <form onSubmit={handleProfileSubmit}>
                <div className="u4-form-row">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  />
                </div>
                <div className="u4-form-row">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  />
                </div>
                <div className="u4-form-row">
                  <label>Professional Headline</label>
                  <input
                    type="text"
                    value={profileForm.headline}
                    onChange={(e) => setProfileForm({ ...profileForm, headline: e.target.value })}
                  />
                </div>
                <div className="u4-form-row">
                  <label>Experience Level</label>
                  <input
                    type="text"
                    value={profileForm.experienceLevel}
                    onChange={(e) => setProfileForm({ ...profileForm, experienceLevel: e.target.value })}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    padding: "10px 20px",
                    background: "#6366f1",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: 700,
                    cursor: "pointer"
                  }}
                >
                  Save to Global Store
                </button>
              </form>
            </div>
          )}
        </div>

        {/* SIDEBAR: e) LIVE MIDDLEWARE ACTION LOGGER & DEVTOOLS PANEL */}
        <aside className="u4-inspector-card">
          <div className="u4-inspector-header">
            <h4>⚡ Middleware Action Monitor</h4>
            <button
              onClick={clearActionLogs}
              style={{
                background: "#334155",
                color: "#e2e8f0",
                border: "none",
                borderRadius: "4px",
                padding: "3px 8px",
                fontSize: "0.72rem",
                cursor: "pointer"
              }}
            >
              Clear Logs
            </button>
          </div>

          <p style={{ margin: "0 0 10px 0", color: "#94a3b8", fontSize: "0.75rem" }}>
            Every action dispatched to the store is intercepted by custom middleware:
          </p>

          <div className="u4-logs-list">
            {actionLogs.length === 0 ? (
              <p style={{ color: "#64748b" }}>No actions recorded yet.</p>
            ) : (
              actionLogs.map((log) => (
                <div key={log.id} className="u4-log-item">
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span className="u4-log-action-name">{log.action}</span>
                    <span className="u4-log-time">{log.timestamp}</span>
                  </div>
                  <div style={{ color: "#94a3b8", fontSize: "0.74rem", marginTop: "4px" }}>
                    {log.diffSummary}
                  </div>
                  {log.payload && (
                    <pre
                      style={{
                        margin: "6px 0 0 0",
                        padding: "4px",
                        background: "#090d16",
                        borderRadius: "4px",
                        fontSize: "0.68rem",
                        color: "#38bdf8",
                        overflowX: "auto"
                      }}
                    >
                      {JSON.stringify(log.payload, null, 2)}
                    </pre>
                  )}
                </div>
              ))
            )}
          </div>

          {/* f) Active Caches Table */}
          <div style={{ marginTop: "18px", borderTop: "1px solid #334155", paddingTop: "12px" }}>
            <h5 style={{ margin: "0 0 6px 0", color: "#38bdf8" }}>
              🗄️ Query Cache Store ({Object.keys(cache).length} cached entries)
            </h5>
            {Object.keys(cache).length === 0 ? (
              <p style={{ color: "#64748b", fontSize: "0.74rem", margin: 0 }}>
                Cache is currently empty.
              </p>
            ) : (
              <table className="u4-cache-table">
                <thead>
                  <tr>
                    <th>Key</th>
                    <th>Hits</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(cache).map(([key, val]) => (
                    <tr key={key}>
                      <td style={{ color: "#cbd5e1" }}>{key || "(all)"}</td>
                      <td style={{ color: "#34d399", fontWeight: 700 }}>{val.hits}</td>
                      <td style={{ color: "#38bdf8" }}>Active</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
