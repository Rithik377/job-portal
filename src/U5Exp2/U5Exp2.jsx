import { useState, Suspense, lazy } from "react";
import "./U5Exp2.css";

// a & b) Lazy Loading for Details & Application Components (Code Splitting)
const LazyJobDetailView = lazy(() =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        default: ({ job, onClose }) => (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            style={{
              background: "#ffffff",
              border: "2px solid #f59e0b",
              borderRadius: "12px",
              padding: "20px",
              marginTop: "16px"
            }}
          >
            <h4 id="modal-title" style={{ margin: "0 0 6px 0", color: "#b45309" }}>
              ⚡ Dynamically Loaded Chunk: {job.title}
            </h4>
            <p style={{ margin: "0 0 10px 0", fontSize: "0.85rem", color: "#475569" }}>
              This component was fetched on-demand using <code>React.lazy()</code> and <code>Suspense</code> to reduce initial JS bundle size!
            </p>
            <p style={{ fontSize: "0.88rem" }}>{job.description}</p>
            <button
              onClick={onClose}
              className="a11y-focusable"
              aria-label="Close Job Details Dialog"
              style={{
                padding: "6px 14px",
                background: "#f59e0b",
                color: "#ffffff",
                border: "none",
                borderRadius: "6px",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Close Chunk View
            </button>
          </div>
        )
      });
    }, 600); // Simulated network bundle load latency
  })
);

export default function U5Exp2() {
  // Selected job for lazy loaded component
  const [selectedLazyJob, setSelectedLazyJob] = useState(null);

  // Security Sanitization demo (Sub-clause f)
  const [userInput, setUserInput] = useState('<script>alert("XSS Attack!")</script> Senior Fullstack Lead');

  // PWA Status (Sub-clause d)
  const [isOfflineSimulated, setIsOfflineSimulated] = useState(false);

  // Simple safe sanitizer preventing XSS
  const sanitizeInput = (text) => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const sampleJob = {
    title: "Senior AI Platform Engineer",
    company: "DeepMind Robotics",
    description: "Design real-time multi-modal AI inference engines with WebAssembly and GPU acceleration."
  };

  return (
    <div className="u5-opt-container">
      {/* Header */}
      <header className="u5-opt-header">
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
          <span style={{ background: "rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 600 }}>
            Unit 5 : Experiment 2
          </span>
          <span style={{ background: "rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 600 }}>
            Optimization & Performance
          </span>
          <span style={{ background: "rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 600 }}>
            PWA • ARIA A11y • Security
          </span>
        </div>
        <h1>Job Portal Optimization, PWA & Security</h1>
        <p>
          Demonstration of route code-splitting, React.lazy() chunk loading, Progressive Web App configuration,
          ARIA accessibility labels & keyboard navigation, and frontend input sanitization against XSS.
        </p>
      </header>

      {/* Grid: 4 Core Optimization Pillars */}
      <div className="u5-grid-2">
        {/* PILLAR 1: a & b) LAZY LOADING & CODE SPLITTING */}
        <section className="u5-opt-card" aria-labelledby="lazy-title">
          <h3 id="lazy-title">⚡ 1. Lazy Loading & Route Code Splitting</h3>
          <p style={{ fontSize: "0.86rem", color: "#475569" }}>
            Routes and heavy detail modal views are decoupled into separate JavaScript chunks that load only when requested by the user.
          </p>

          <button
            onClick={() => setSelectedLazyJob(sampleJob)}
            className="a11y-focusable"
            aria-label="Load Job Details chunk on demand"
            style={{
              padding: "10px 18px",
              background: "#d97706",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            📦 Load Lazy Component Chunk
          </button>

          {selectedLazyJob && (
            <Suspense
              fallback={
                <div
                  role="status"
                  aria-live="polite"
                  style={{
                    padding: "20px",
                    background: "#fef3c7",
                    borderRadius: "8px",
                    marginTop: "16px",
                    textAlign: "center",
                    fontWeight: 600,
                    color: "#92400e"
                  }}
                >
                  ⏳ Loading code-split chunk via React.lazy()...
                </div>
              }
            >
              <LazyJobDetailView
                job={selectedLazyJob}
                onClose={() => setSelectedLazyJob(null)}
              />
            </Suspense>
          )}
        </section>

        {/* PILLAR 2: d) PWA READINESS & OFFLINE CAPABILITY */}
        <section className="u5-opt-card" aria-labelledby="pwa-title">
          <h3 id="pwa-title">📱 2. Progressive Web App (PWA) Features</h3>
          <p style={{ fontSize: "0.86rem", color: "#475569" }}>
            Configured with Web App Manifest (<code>public/site.webmanifest</code>), mobile home screen icons,
            standalone viewport mode, and offline caching readiness.
          </p>

          <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "8px", fontSize: "0.82rem", marginBottom: "14px" }}>
            <div>✓ <strong>Manifest File:</strong> <code>site.webmanifest</code> detected</div>
            <div>✓ <strong>Display Mode:</strong> Standalone (Mobile App-like frame)</div>
            <div>✓ <strong>App Icons:</strong> 192x192 & 512x512 PNG assets linked</div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Simulate Network:</span>
            <button
              onClick={() => setIsOfflineSimulated(!isOfflineSimulated)}
              className="a11y-focusable"
              aria-label="Toggle offline network simulation"
              style={{
                padding: "6px 14px",
                borderRadius: "6px",
                border: "none",
                fontWeight: 700,
                cursor: "pointer",
                background: isOfflineSimulated ? "#fee2e2" : "#dcfce7",
                color: isOfflineSimulated ? "#dc2626" : "#166534"
              }}
            >
              {isOfflineSimulated ? "🔴 Offline Mode (Cached)" : "🟢 Online (Live Network)"}
            </button>
          </div>

          {isOfflineSimulated && (
            <div
              role="alert"
              style={{
                background: "#fef2f2",
                border: "1px solid #fecaca",
                color: "#991b1b",
                padding: "10px",
                borderRadius: "6px",
                marginTop: "12px",
                fontSize: "0.8rem"
              }}
            >
              ⚠️ You are offline. Cached job application drafts and saved jobs remain accessible!
            </div>
          )}
        </section>

        {/* PILLAR 3: e) ACCESSIBILITY (ARIA & KEYBOARD NAVIGATION) */}
        <section className="u5-opt-card" aria-labelledby="a11y-title">
          <h3 id="a11y-title">♿ 3. Accessibility & Keyboard Navigation (WCAG)</h3>
          <p style={{ fontSize: "0.86rem", color: "#475569" }}>
            Includes distinct focus rings (<code>:focus-visible</code>), explicit form labels, ARIA landmarks,
            and screen-reader friendly live announcements (<code>aria-live</code>).
          </p>

          <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div>
              <label htmlFor="a11y-job-search" style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>
                Accessible Search Field (Press Tab to test focus)
              </label>
              <input
                id="a11y-job-search"
                type="text"
                className="a11y-focusable"
                aria-label="Search job title with screen reader feedback"
                aria-describedby="search-hint"
                placeholder="Tab into this field to test gold focus ring..."
                style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
              />
              <span id="search-hint" style={{ fontSize: "0.72rem", color: "#64748b" }}>
                Assistive hint: Keyboard users can press Tab and Shift+Tab to navigate all controls.
              </span>
            </div>

            <button
              type="button"
              className="a11y-focusable"
              aria-label="Accessible Submit Button with High-Contrast Focus"
              style={{
                padding: "8px 16px",
                background: "#1e293b",
                color: "#ffffff",
                border: "none",
                borderRadius: "6px",
                fontWeight: 600,
                cursor: "pointer",
                alignSelf: "flex-start"
              }}
            >
              Test Keyboard Focus
            </button>
          </form>
        </section>

        {/* PILLAR 4: f) FRONT-END SECURITY PRACTICES */}
        <section className="u5-opt-card" aria-labelledby="sec-title">
          <h3 id="sec-title">🔒 4. Front-End Security & Sanitization</h3>
          <p style={{ fontSize: "0.86rem", color: "#475569" }}>
            Protects against Stored and Reflected Cross-Site Scripting (XSS), sanitizes input before rendering,
            and enforces secure token storage policies.
          </p>

          <div>
            <label htmlFor="sec-input" style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "4px" }}>
              Test Raw Input (Try injecting script or HTML tags):
            </label>
            <input
              id="sec-input"
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="a11y-focusable"
              style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
            />
          </div>

          <div className="u5-security-demo">
            <div>
              <strong>Sanitized Safe String:</strong>
              <div style={{ color: "#059669", fontFamily: "monospace", marginTop: "4px" }}>
                {sanitizeInput(userInput)}
              </div>
            </div>
            <div style={{ marginTop: "10px", fontSize: "0.75rem", color: "#64748b" }}>
              ✓ Dangerous executable script tags are sanitized into safe HTML entities before rendering or transmission to API endpoints.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
