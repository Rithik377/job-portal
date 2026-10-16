import { useState, useEffect } from "react";
import { CrudAPI, setCrudFailure, getCrudFailure } from "./crudService";
import "./U4Exp3.css";

export default function U4Exp3() {
  const [activeTab, setActiveTab] = useState("jobs"); // 'jobs' | 'applications' | 'saved' | 'profile'

  // Data states
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [profile, setProfile] = useState(null);

  // Search filter for GET /jobs
  const [searchQuery, setSearchQuery] = useState("");

  // UI status states
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const [simError, setSimError] = useState(getCrudFailure());

  // Modal states for POST application
  const [applyModalJob, setApplyModalJob] = useState(null);
  const [applicationForm, setApplicationForm] = useState({
    applicantName: "",
    email: "",
    phone: "",
    experience: "Fresher",
    portfolioUrl: "",
    candidateNotes: ""
  });

  // Modal states for PATCH application
  const [editAppModal, setEditAppModal] = useState(null);
  const [editForm, setEditForm] = useState({
    status: "",
    candidateNotes: "",
    portfolioUrl: ""
  });

  // Form states for PUT profile
  const [profileForm, setProfileForm] = useState(null);

  const showToast = (message, method = "GET") => {
    setToast({ message, method });
    setTimeout(() => setToast(null), 4000);
  };

  // a) Retrieve jobs using GET
  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await CrudAPI.getJobs(searchQuery);
      setJobs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // e) Retrieve applications using GET
  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await CrudAPI.getApplications();
      setApplications(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // e) Retrieve saved jobs using GET
  const fetchSavedJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await CrudAPI.getSavedJobs();
      setSavedJobs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // c) Retrieve profile using GET
  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await CrudAPI.getProfile();
      setProfile(data);
      setProfileForm(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial and tab data fetch with cancellation pattern
  useEffect(() => {
    let active = true;

    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        if (activeTab === "jobs") {
          const data = await CrudAPI.getJobs(searchQuery);
          if (active) setJobs(data);
        } else if (activeTab === "applications") {
          const data = await CrudAPI.getApplications();
          if (active) setApplications(data);
        } else if (activeTab === "saved") {
          const data = await CrudAPI.getSavedJobs();
          if (active) setSavedJobs(data);
        } else if (activeTab === "profile") {
          const data = await CrudAPI.getProfile();
          if (active) {
            setProfile(data);
            setProfileForm(data);
          }
        }
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadData();

    return () => {
      active = false;
    };
  }, [activeTab, searchQuery]);

  // b) Create a job application using POST
  const handleOpenApplyModal = (job) => {
    setApplyModalJob(job);
    setApplicationForm({
      applicantName: profile ? profile.name : "Jordan Reed",
      email: profile ? profile.email : "jordan@example.com",
      phone: profile ? profile.phone : "+91 91234 56789",
      experience: "2-4 Years",
      portfolioUrl: "https://github.com/my-portfolio",
      candidateNotes: "Very excited to apply for " + job.title
    });
  };

  const handlePostApplication = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const newApp = await CrudAPI.createApplication({
        jobId: applyModalJob.id,
        jobTitle: applyModalJob.title,
        company: applyModalJob.company,
        ...applicationForm
      });
      showToast(`POST 201 Created: Application submitted for ${newApp.jobTitle}`, "POST");
      setApplyModalJob(null);
      fetchApplications();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // c) Update application information using PATCH
  const handleOpenEditApp = (app) => {
    setEditAppModal(app);
    setEditForm({
      status: app.status,
      candidateNotes: app.candidateNotes || "",
      portfolioUrl: app.portfolioUrl || ""
    });
  };

  const handlePatchApplication = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      await CrudAPI.patchApplication(editAppModal.id, editForm);
      showToast(`PATCH 200 OK: Application #${editAppModal.id} updated`, "PATCH");
      setEditAppModal(null);
      fetchApplications();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // d) Withdraw an application using DELETE
  const handleDeleteApplication = async (appId, jobTitle) => {
    if (!window.confirm(`Are you sure you want to withdraw application for "${jobTitle}"? (DELETE /api/applications/${appId})`)) {
      return;
    }
    setActionLoading(true);
    try {
      await CrudAPI.deleteApplication(appId);
      showToast(`DELETE 204 No Content: Application #${appId} withdrawn`, "DELETE");
      fetchApplications();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // c) Update profile using PUT
  const handlePutProfile = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const updated = await CrudAPI.putProfile(profileForm);
      setProfile(updated);
      showToast("PUT 200 OK: Complete candidate profile updated", "PUT");
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Toggle Save Job
  const handleToggleSave = async (jobId) => {
    try {
      await CrudAPI.toggleSaveJob(jobId);
      showToast(`POST/DELETE /api/saved-jobs: Updated bookmark state`, "POST");
      if (activeTab === "saved") fetchSavedJobs();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const toggleSimulateError = () => {
    const next = !simError;
    setCrudFailure(next);
    setSimError(next);
  };

  return (
    <div className="u4-crud-container">
      {/* Header */}
      <header className="u4-crud-header">
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
          <span style={{ background: "rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 600 }}>
            Unit 4 : Experiment 3
          </span>
          <span style={{ background: "rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 600 }}>
            REST API CRUD Operations
          </span>
          <span style={{ background: "rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 600 }}>
            GET • POST • PUT/PATCH • DELETE
          </span>
        </div>
        <h1>Job & Application REST CRUD Architecture</h1>
        <p>
          Complete implementation of HTTP REST methods: GET jobs/history, POST new applications,
          PUT full profile updates, PATCH application status/notes, and DELETE to withdraw applications.
        </p>
      </header>

      {/* Toast Alert for Operations */}
      {toast && (
        <div className="u4-toast-box">
          <div>
            <span className={`u4-http-badge http-${toast.method.toLowerCase()}`}>
              {toast.method}
            </span>
            <strong>{toast.message}</strong>
          </div>
          <button
            onClick={() => setToast(null)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#065f46", fontWeight: "bold" }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Toolbar & Simulation Switch */}
      <section className="u4-crud-toolbar">
        <div className="u4-crud-tabs">
          <button
            className={`u4-crud-tab-btn ${activeTab === "jobs" ? "active" : ""}`}
            onClick={() => setActiveTab("jobs")}
          >
            <span className="u4-http-badge http-get">GET</span> Explore Jobs ({jobs.length})
          </button>
          <button
            className={`u4-crud-tab-btn ${activeTab === "applications" ? "active" : ""}`}
            onClick={() => setActiveTab("applications")}
          >
            <span className="u4-http-badge http-post">POST/PATCH/DELETE</span> Applications ({applications.length})
          </button>
          <button
            className={`u4-crud-tab-btn ${activeTab === "saved" ? "active" : ""}`}
            onClick={() => setActiveTab("saved")}
          >
            <span className="u4-http-badge http-get">GET</span> Saved Jobs ({savedJobs.length})
          </button>
          <button
            className={`u4-crud-tab-btn ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <span className="u4-http-badge http-put">PUT</span> Profile Info
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.85rem" }}>
          <span>REST API Failure Mode:</span>
          <button
            onClick={toggleSimulateError}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              border: "none",
              fontWeight: 700,
              cursor: "pointer",
              background: simError ? "#fee2e2" : "#dcfce7",
              color: simError ? "#dc2626" : "#166534"
            }}
          >
            {simError ? "🔴 Error Simulation Active" : "🟢 200 OK Mode"}
          </button>
        </div>
      </section>

      {/* Loading State (f) */}
      {loading && (
        <div style={{ padding: "40px", textAlign: "center", background: "#ffffff", borderRadius: "12px", border: "1px dashed #cbd5e1" }}>
          <p style={{ margin: 0, fontWeight: 600, color: "#0284c7" }}>⏳ Executing HTTP REST Request...</p>
        </div>
      )}

      {/* Error State (f) */}
      {error && !loading && (
        <div style={{ padding: "20px", background: "#fee2e2", border: "1px solid #fecaca", borderRadius: "12px", textAlign: "center", marginBottom: "20px" }}>
          <p style={{ margin: "0 0 10px 0", color: "#991b1b", fontWeight: 600 }}>⚠️ {error}</p>
          <button
            onClick={() => {
              if (activeTab === "jobs") fetchJobs();
              if (activeTab === "applications") fetchApplications();
              if (activeTab === "saved") fetchSavedJobs();
              if (activeTab === "profile") fetchProfile();
            }}
            style={{ padding: "6px 14px", background: "#dc2626", color: "#ffffff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: 600 }}
          >
            Retry Request
          </button>
        </div>
      )}

      {/* TAB 1: a) RETRIEVE JOBS USING GET */}
      {!loading && !error && activeTab === "jobs" && (
        <div>
          <div style={{ marginBottom: "16px", display: "flex", gap: "12px" }}>
            <input
              type="text"
              placeholder="Search jobs with GET /api/jobs?query=..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ flex: 1, padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
            />
            <button
              onClick={fetchJobs}
              style={{ padding: "10px 18px", background: "#0284c7", color: "#ffffff", border: "none", borderRadius: "8px", fontWeight: 600, cursor: "pointer" }}
            >
              🔍 GET Jobs
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "16px" }}>
            {jobs.map((job) => (
              <div key={job.id} className="u4-crud-card">
                <span className="u4-http-badge http-get">GET /api/jobs/{job.id}</span>
                <h3 style={{ marginTop: "6px" }}>{job.title}</h3>
                <p style={{ margin: "0 0 10px 0", color: "#64748b", fontSize: "0.88rem" }}>
                  {job.company} • {job.location} • <strong>{job.salary}</strong>
                </p>
                <p style={{ fontSize: "0.86rem", color: "#475569", lineHeight: "1.5" }}>
                  {job.description}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px", borderTop: "1px solid #f1f5f9", paddingTop: "12px" }}>
                  <button
                    onClick={() => handleToggleSave(job.id)}
                    style={{ background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", padding: "6px 12px", cursor: "pointer", fontSize: "0.82rem" }}
                  >
                    ⭐ Save Job
                  </button>
                  {/* b) Trigger POST Application Modal */}
                  <button
                    className="u4-crud-btn btn-post-apply"
                    onClick={() => handleOpenApplyModal(job)}
                  >
                    <span className="u4-http-badge http-post">POST</span> Apply for Position
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: e) APPLICATION HISTORY (GET, PATCH, DELETE) */}
      {!loading && !error && activeTab === "applications" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", alignItems: "center" }}>
            <h3 style={{ margin: 0 }}>
              <span className="u4-http-badge http-get">GET /api/applications</span> Application Records
            </h3>
            <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
              Total: {applications.length} submitted applications
            </span>
          </div>

          {applications.length === 0 ? (
            <div style={{ background: "#ffffff", padding: "40px", textAlign: "center", borderRadius: "12px" }}>
              <p>No applications recorded yet. Go to &quot;Explore Jobs&quot; and click &quot;Apply&quot; to test POST /api/applications.</p>
            </div>
          ) : (
            applications.map((app) => (
              <div key={app.id} className="u4-crud-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "4px" }}>
                      <span className="u4-http-badge http-get">ID: {app.id}</span>
                      <h3 style={{ margin: 0 }}>{app.jobTitle}</h3>
                    </div>
                    <p style={{ margin: "4px 0", color: "#64748b", fontSize: "0.88rem" }}>
                      <strong>{app.company}</strong> • Candidate: {app.applicantName} ({app.email})
                    </p>
                    <p style={{ margin: "4px 0", color: "#475569", fontSize: "0.84rem" }}>
                      📅 Applied: {app.appliedDate} • 📞 Phone: {app.phone}
                    </p>
                    <div style={{ background: "#f8fafc", padding: "8px 12px", borderRadius: "6px", margin: "8px 0", fontSize: "0.82rem" }}>
                      <strong>Candidate Notes:</strong> {app.candidateNotes || "None"}
                      {app.portfolioUrl && <div>🌐 Portfolio: {app.portfolioUrl}</div>}
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "4px 10px",
                        borderRadius: "999px",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        background: app.status === "Interview Scheduled" ? "#dcfce7" : "#fef3c7",
                        color: app.status === "Interview Scheduled" ? "#166534" : "#92400e",
                        marginBottom: "10px"
                      }}
                    >
                      {app.status}
                    </span>
                    <div style={{ display: "flex", gap: "8px" }}>
                      {/* c) Update application using PATCH */}
                      <button
                        className="u4-crud-btn btn-patch-edit"
                        onClick={() => handleOpenEditApp(app)}
                      >
                        <span className="u4-http-badge http-patch">PATCH</span> Edit Notes
                      </button>
                      {/* d) Withdraw application using DELETE */}
                      <button
                        className="u4-crud-btn btn-delete-withdraw"
                        onClick={() => handleDeleteApplication(app.id, app.jobTitle)}
                      >
                        <span className="u4-http-badge http-delete">DELETE</span> Withdraw
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 3: e) RETRIEVE SAVED JOBS USING GET */}
      {!loading && !error && activeTab === "saved" && (
        <div>
          <h3 style={{ margin: "0 0 16px 0" }}>
            <span className="u4-http-badge http-get">GET /api/saved-jobs</span> Bookmarked Positions
          </h3>
          {savedJobs.length === 0 ? (
            <div style={{ background: "#ffffff", padding: "40px", textAlign: "center", borderRadius: "12px" }}>
              <p>No saved jobs found.</p>
            </div>
          ) : (
            savedJobs.map((j) => (
              <div key={j.id} className="u4-crud-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h3 style={{ margin: "0 0 4px 0" }}>{j.title}</h3>
                  <span style={{ color: "#64748b", fontSize: "0.85rem" }}>
                    {j.company} • {j.location} • {j.salary}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    className="u4-crud-btn btn-delete-withdraw"
                    onClick={() => handleToggleSave(j.id)}
                  >
                    Remove
                  </button>
                  <button
                    className="u4-crud-btn btn-post-apply"
                    onClick={() => handleOpenApplyModal(j)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 4: c) RETRIEVE & UPDATE PROFILE (GET & PUT) */}
      {!loading && !error && activeTab === "profile" && profileForm && (
        <div style={{ background: "#ffffff", padding: "28px", borderRadius: "16px", border: "1px solid #e2e8f0", maxWidth: "700px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ margin: 0 }}>
              <span className="u4-http-badge http-put">PUT /api/profile</span> Full Profile Update
            </h3>
            <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
              HTTP Idempotent Entity Update
            </span>
          </div>

          <form onSubmit={handlePutProfile}>
            <div className="u4-input-group">
              <label>Candidate Name</label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                required
              />
            </div>
            <div className="u4-input-group">
              <label>Email Address</label>
              <input
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                required
              />
            </div>
            <div className="u4-input-group">
              <label>Contact Phone</label>
              <input
                type="text"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                required
              />
            </div>
            <div className="u4-input-group">
              <label>Professional Headline</label>
              <input
                type="text"
                value={profileForm.headline}
                onChange={(e) => setProfileForm({ ...profileForm, headline: e.target.value })}
                required
              />
            </div>
            <div className="u4-input-group">
              <label>Skills (Comma-separated)</label>
              <input
                type="text"
                value={profileForm.skills}
                onChange={(e) => setProfileForm({ ...profileForm, skills: e.target.value })}
              />
            </div>
            <div className="u4-input-group">
              <label>Professional Bio</label>
              <textarea
                rows="3"
                value={profileForm.bio}
                onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={actionLoading}
              style={{
                padding: "10px 22px",
                background: "#0284c7",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                fontWeight: 700,
                cursor: "pointer"
              }}
            >
              {actionLoading ? "Executing PUT..." : "💾 Save via PUT /api/profile"}
            </button>
          </form>
        </div>
      )}

      {/* b) MODAL: CREATE APPLICATION USING POST */}
      {applyModalJob && (
        <div className="u4-modal-overlay" onClick={() => setApplyModalJob(null)}>
          <div className="u4-modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div>
                <span className="u4-http-badge http-post">POST /api/applications</span>
                <h3 style={{ margin: "4px 0 0 0" }}>Apply: {applyModalJob.title}</h3>
                <span style={{ fontSize: "0.85rem", color: "#64748b" }}>{applyModalJob.company}</span>
              </div>
              <button
                onClick={() => setApplyModalJob(null)}
                style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePostApplication}>
              <div className="u4-input-group">
                <label>Applicant Full Name</label>
                <input
                  type="text"
                  value={applicationForm.applicantName}
                  onChange={(e) => setApplicationForm({ ...applicationForm, applicantName: e.target.value })}
                  required
                />
              </div>

              <div className="u4-input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={applicationForm.email}
                  onChange={(e) => setApplicationForm({ ...applicationForm, email: e.target.value })}
                  required
                />
              </div>

              <div className="u4-input-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  value={applicationForm.phone}
                  onChange={(e) => setApplicationForm({ ...applicationForm, phone: e.target.value })}
                  required
                />
              </div>

              <div className="u4-input-group">
                <label>Years of Relevant Experience</label>
                <select
                  value={applicationForm.experience}
                  onChange={(e) => setApplicationForm({ ...applicationForm, experience: e.target.value })}
                >
                  <option value="Fresher">Fresher (0 years)</option>
                  <option value="1-2 Years">1-2 Years</option>
                  <option value="2-4 Years">2-4 Years</option>
                  <option value="5+ Years">5+ Years</option>
                </select>
              </div>

              <div className="u4-input-group">
                <label>Portfolio / GitHub URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={applicationForm.portfolioUrl}
                  onChange={(e) => setApplicationForm({ ...applicationForm, portfolioUrl: e.target.value })}
                />
              </div>

              <div className="u4-input-group">
                <label>Cover Letter / Candidate Notes</label>
                <textarea
                  rows="3"
                  value={applicationForm.candidateNotes}
                  onChange={(e) => setApplicationForm({ ...applicationForm, candidateNotes: e.target.value })}
                ></textarea>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
                <button
                  type="button"
                  onClick={() => setApplyModalJob(null)}
                  style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "#f8fafc", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  style={{ padding: "8px 18px", borderRadius: "8px", border: "none", background: "#0284c7", color: "#ffffff", fontWeight: 700, cursor: "pointer" }}
                >
                  {actionLoading ? "Submitting POST..." : "Submit Application (POST)"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* c) MODAL: UPDATE APPLICATION USING PATCH */}
      {editAppModal && (
        <div className="u4-modal-overlay" onClick={() => setEditAppModal(null)}>
          <div className="u4-modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div>
                <span className="u4-http-badge http-patch">PATCH /api/applications/{editAppModal.id}</span>
                <h3 style={{ margin: "4px 0 0 0" }}>Update Application Notes</h3>
                <span style={{ fontSize: "0.85rem", color: "#64748b" }}>{editAppModal.jobTitle}</span>
              </div>
              <button
                onClick={() => setEditAppModal(null)}
                style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePatchApplication}>
              <div className="u4-input-group">
                <label>Application Status (Candidate view)</label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                >
                  <option value="Submitted">Submitted</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                </select>
              </div>

              <div className="u4-input-group">
                <label>Additional Candidate Notes / Interview Updates</label>
                <textarea
                  rows="4"
                  value={editForm.candidateNotes}
                  onChange={(e) => setEditForm({ ...editForm, candidateNotes: e.target.value })}
                ></textarea>
              </div>

              <div className="u4-input-group">
                <label>Updated Portfolio / Project Demo URL</label>
                <input
                  type="url"
                  value={editForm.portfolioUrl}
                  onChange={(e) => setEditForm({ ...editForm, portfolioUrl: e.target.value })}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
                <button
                  type="button"
                  onClick={() => setEditAppModal(null)}
                  style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "#f8fafc", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  style={{ padding: "8px 18px", borderRadius: "8px", border: "none", background: "#f59e0b", color: "#ffffff", fontWeight: 700, cursor: "pointer" }}
                >
                  {actionLoading ? "Applying PATCH..." : "Save via PATCH"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
