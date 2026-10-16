import { useState, useEffect, useMemo } from "react";
import {
  AuthService,
  TokenStorage,
  parseJwt,
  setAuthListeners
} from "./authService";
import "./U4Exp4.css";

export default function U4Exp4() {
  // Current authenticated user & token states (b, e)
  const [currentUser, setCurrentUser] = useState(TokenStorage.getUser());
  const [token, setToken] = useState(TokenStorage.getToken());

  // Compute decoded token via useMemo to avoid setState in effect
  const decodedToken = useMemo(() => {
    return token ? parseJwt(token) : null;
  }, [token]);

  // Form states (a)
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [authForm, setAuthForm] = useState({
    name: "Alex Morgan",
    email: "applicant@jobportal.com",
    password: "password123"
  });

  // UI status & modal states (f)
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [sessionExpiredNotice, setSessionExpiredNotice] = useState(null);
  const [protectedOpResult, setProtectedOpResult] = useState(null);

  // Interceptor live network log terminal
  const [interceptorLogs, setInterceptorLogs] = useState([]);

  // Subscribe to Axios Request/Response Interceptor events
  useEffect(() => {
    setAuthListeners({
      onRequest: (log) => {
        setInterceptorLogs((prev) => [log, ...prev.slice(0, 19)]);
      },
      onSessionExpired: (msg) => {
        setSessionExpiredNotice(msg);
        setCurrentUser(null);
        setToken(null);
      }
    });
  }, []);

  // a & b) Login handler
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAuthError(null);
    setSessionExpiredNotice(null);

    try {
      let result;
      if (isRegisterMode) {
        result = await AuthService.register(
          authForm.name,
          authForm.email,
          authForm.password
        );
      } else {
        result = await AuthService.login(
          authForm.email,
          authForm.password
        );
      }

      setCurrentUser(result.user);
      setToken(result.token);
      setProtectedOpResult({
        title: "Authentication Successful",
        data: `Token generated and stored in localStorage. Role: ${result.user.role}`
      });
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // e) Logout and token removal
  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(null);
    setToken(null);
    setProtectedOpResult({
      title: "Logged Out",
      data: "Token removed from localStorage and state cleared."
    });
  };

  // f) Simulate Expired or Corrupted Token
  const handleCorruptToken = () => {
    AuthService.corruptOrExpireToken();
    setToken(TokenStorage.getToken());
    setProtectedOpResult({
      title: "Token Corrupted / Expired",
      data: "Token expiration timestamp set to the past. The next protected API request will trigger HTTP 401 Unauthorized!"
    });
  };

  // d) Protected Operations Execution
  const handleRunProtectedOp = async (opName, apiFn) => {
    setLoading(true);
    setAuthError(null);
    try {
      const res = await apiFn();
      setProtectedOpResult({
        title: `✅ Protected Request Allowed: ${opName}`,
        data: res.data
      });
    } catch (err) {
      const errorMsg =
        err.response?.data || err.message || "401 Unauthorized Request";
      setProtectedOpResult({
        title: `⛔ 401 Unauthorized Blocked: ${opName}`,
        data: errorMsg,
        isError: true
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="u4-auth-container">
      {/* Header */}
      <header className="u4-auth-header">
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
          <span style={{ background: "rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 600 }}>
            Unit 4 : Experiment 4
          </span>
          <span style={{ background: "rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 600 }}>
            JWT Token Management
          </span>
          <span style={{ background: "rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 600 }}>
            Axios Request / Response Interceptors
          </span>
          <span style={{ background: "rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 600 }}>
            Protected APIs
          </span>
        </div>
        <h1>Authentication & Token Management</h1>
        <p>
          Secure applicant login, JWT token persistence, automatic Authorization Bearer attachment via Axios interceptors,
          route & resource protection, and 401 session expiration handling.
        </p>
      </header>

      {/* Session Expired Notice (f) */}
      {sessionExpiredNotice && (
        <div
          style={{
            background: "#fee2e2",
            border: "1px solid #f87171",
            color: "#991b1b",
            padding: "14px 18px",
            borderRadius: "12px",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div>
            <strong>⚠️ Session Terminated:</strong> {sessionExpiredNotice}
          </div>
          <button
            onClick={() => setSessionExpiredNotice(null)}
            style={{ background: "none", border: "none", color: "#991b1b", fontWeight: "bold", cursor: "pointer" }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Layout Grid */}
      <div className="u4-auth-layout">
        {/* Left Column: Auth Status, Login Form & Protected Operations */}
        <div>
          {/* Box 1: Auth State & Form */}
          <div className="u4-card-box" style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ margin: 0, color: "#0f172a" }}>
                {currentUser ? "👤 Active Applicant Session" : "🔐 Applicant Authentication"}
              </h3>
              {currentUser && (
                <span className="u4-token-badge">Authenticated</span>
              )}
            </div>

            {currentUser ? (
              <div>
                <p style={{ margin: "0 0 10px 0", fontSize: "0.92rem", color: "#334155" }}>
                  Logged in as: <strong>{currentUser.name}</strong> ({currentUser.email})
                </p>
                <div style={{ display: "flex", gap: "10px", marginTop: "14px" }}>
                  <button className="u4-btn-logout" onClick={handleLogout}>
                    🚪 Logout & Remove Token
                  </button>
                  <button className="u4-btn-expire" onClick={handleCorruptToken}>
                    ⚠️ Corrupt / Expire Token
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", gap: "10px", marginBottom: "14px" }}>
                  <button
                    onClick={() => setIsRegisterMode(false)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "6px",
                      border: "none",
                      background: !isRegisterMode ? "#4f46e5" : "#f1f5f9",
                      color: !isRegisterMode ? "#ffffff" : "#475569",
                      fontWeight: 600,
                      cursor: "pointer",
                      fontSize: "0.85rem"
                    }}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setIsRegisterMode(true)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "6px",
                      border: "none",
                      background: isRegisterMode ? "#4f46e5" : "#f1f5f9",
                      color: isRegisterMode ? "#ffffff" : "#475569",
                      fontWeight: 600,
                      cursor: "pointer",
                      fontSize: "0.85rem"
                    }}
                  >
                    Register New
                  </button>
                </div>

                {authError && (
                  <div style={{ background: "#fee2e2", color: "#991b1b", padding: "8px 12px", borderRadius: "6px", marginBottom: "12px", fontSize: "0.85rem" }}>
                    {authError}
                  </div>
                )}

                <form onSubmit={handleAuthSubmit}>
                  {isRegisterMode && (
                    <div style={{ marginBottom: "12px" }}>
                      <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>Full Name</label>
                      <input
                        type="text"
                        value={authForm.name}
                        onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                        required
                        style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                      />
                    </div>
                  )}

                  <div style={{ marginBottom: "12px" }}>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>Email Address</label>
                    <input
                      type="email"
                      value={authForm.email}
                      onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                      required
                      style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                    />
                  </div>

                  <div style={{ marginBottom: "12px" }}>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>Password</label>
                    <input
                      type="password"
                      value={authForm.password}
                      onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                      required
                      style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                    />
                  </div>

                  <button type="submit" className="u4-btn-auth" disabled={loading}>
                    {loading ? "Authenticating..." : isRegisterMode ? "Create Account & Get Token" : "Login (POST /api/auth/login)"}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Box 2: d) Test Protected Job Portal Operations */}
          <div className="u4-card-box">
            <h3 style={{ margin: "0 0 10px 0", color: "#0f172a" }}>
              🛡️ Protected Operations Verification
            </h3>
            <p style={{ margin: "0 0 16px 0", fontSize: "0.84rem", color: "#64748b" }}>
              These endpoints require an active Bearer JWT token attached by the Axios request interceptor:
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <button
                onClick={() => handleRunProtectedOp("GET Profile", AuthService.getProtectedProfile)}
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  background: "#f8fafc",
                  fontWeight: 600,
                  fontSize: "0.82rem",
                  cursor: "pointer",
                  textAlign: "left"
                }}
              >
                🔒 Protected Profile
              </button>

              <button
                onClick={() =>
                  handleRunProtectedOp("POST Application", () =>
                    AuthService.submitProtectedApplication("JOB-101", {
                      notes: "Protected application submission",
                      portfolio: "https://github.com/alex"
                    })
                  )
                }
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  background: "#f8fafc",
                  fontWeight: 600,
                  fontSize: "0.82rem",
                  cursor: "pointer",
                  textAlign: "left"
                }}
              >
                🔒 Protected Apply
              </button>

              <button
                onClick={() => handleRunProtectedOp("GET Saved Jobs", AuthService.getProtectedSavedJobs)}
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  background: "#f8fafc",
                  fontWeight: 600,
                  fontSize: "0.82rem",
                  cursor: "pointer",
                  textAlign: "left"
                }}
              >
                🔒 Protected Saved Jobs
              </button>

              <button
                onClick={() => handleRunProtectedOp("GET Job Alerts", AuthService.getProtectedJobAlerts)}
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  background: "#f8fafc",
                  fontWeight: 600,
                  fontSize: "0.82rem",
                  cursor: "pointer",
                  textAlign: "left"
                }}
              >
                🔒 Protected Job Alerts
              </button>
            </div>

            {/* Protected Op Result Box */}
            {protectedOpResult && (
              <div
                style={{
                  marginTop: "16px",
                  padding: "12px",
                  borderRadius: "8px",
                  background: protectedOpResult.isError ? "#fee2e2" : "#ecfdf5",
                  border: `1px solid ${protectedOpResult.isError ? "#fca5a5" : "#a7f3d0"}`,
                  fontSize: "0.85rem"
                }}
              >
                <strong>{protectedOpResult.title}</strong>
                <pre
                  style={{
                    margin: "8px 0 0 0",
                    fontSize: "0.75rem",
                    overflowX: "auto",
                    color: protectedOpResult.isError ? "#991b1b" : "#065f46"
                  }}
                >
                  {typeof protectedOpResult.data === "string"
                    ? protectedOpResult.data
                    : JSON.stringify(protectedOpResult.data, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Box 3: b) Stored JWT Token Inspector */}
          {token && decodedToken && (
            <div className="u4-card-box" style={{ marginTop: "20px" }}>
              <h4 style={{ margin: "0 0 10px 0", color: "#4f46e5" }}>
                🔑 Stored JWT Token Payload
              </h4>
              <div style={{ fontSize: "0.82rem", display: "flex", flexDirection: "column", gap: "6px" }}>
                <div>
                  <strong>Subject (User ID):</strong> <code>{decodedToken.sub}</code>
                </div>
                <div>
                  <strong>Email:</strong> <code>{decodedToken.email}</code>
                </div>
                <div>
                  <strong>Role:</strong> <code>{decodedToken.role}</code>
                </div>
                <div>
                  <strong>Expires At:</strong>{" "}
                  <code>{new Date(decodedToken.exp).toLocaleTimeString()}</code>
                </div>
                <div>
                  <strong>Raw Token:</strong>
                  <div
                    style={{
                      wordBreak: "break-all",
                      background: "#f1f5f9",
                      padding: "8px",
                      borderRadius: "6px",
                      fontSize: "0.72rem",
                      color: "#475569",
                      marginTop: "4px"
                    }}
                  >
                    {token}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: c & f) Live Axios Interceptor Network Terminal */}
        <div>
          <div className="u4-terminal-box">
            <div className="u4-terminal-header">
              <span>📡 Axios Interceptor Network Inspector</span>
              <span>{interceptorLogs.length} Events</span>
            </div>

            <div className="u4-terminal-logs">
              {interceptorLogs.length === 0 ? (
                <div style={{ color: "#64748b", textAlign: "center", padding: "40px 0" }}>
                  Perform any login or protected operation to see the Axios interceptor attach Authorization Bearer tokens in real time.
                </div>
              ) : (
                interceptorLogs.map((log, index) => (
                  <div key={index} className="u4-log-block">
                    <div style={{ display: "flex", justifyContent: "space-between", color: "#38bdf8", fontWeight: "bold" }}>
                      <span>
                        [{log.method}] {log.endpoint}
                      </span>
                      <span style={{ color: "#94a3b8", fontSize: "0.7rem" }}>
                        {log.timestamp}
                      </span>
                    </div>

                    <div style={{ marginTop: "4px", color: log.tokenAttached ? "#4ade80" : "#f87171" }}>
                      {log.tokenAttached
                        ? "✓ Authorization: Bearer <JWT Token Attached>"
                        : "✗ No Token Attached (Guest Request)"}
                    </div>

                    <div style={{ marginTop: "6px", color: "#94a3b8", fontSize: "0.72rem" }}>
                      Headers: {JSON.stringify(log.headers)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
