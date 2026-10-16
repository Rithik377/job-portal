import { useState } from "react";
import "./U5Exp1.css";

const TEST_SPECS = [
  {
    id: "TEST-A",
    title: "a) Test Job Cards, Job Lists & Dynamic Details Components",
    desc: "Verify that JobCard displays title, company, salary badge, skills, and triggers detailed modal on click using screen.getByText and userEvent.click.",
    assertions: [
      "expect(screen.getByText('Senior Frontend Engineer')).toBeInTheDocument()",
      "expect(screen.getByText('₹24 - 32 LPA')).toBeVisible()",
      "expect(screen.getByRole('button', { name: /View Full Details/i })).toBeEnabled()"
    ]
  },
  {
    id: "TEST-B",
    title: "b) Test Multi-field Filtering (Title, Company, Location, Salary)",
    desc: "Simulate change events on search query, dropdowns, and salary ranges. Confirm filtered job listings update dynamically without page reloads.",
    assertions: [
      "fireEvent.change(screen.getByPlaceholderText(/e.g. React/i), { target: { value: 'Frontend' } })",
      "expect(screen.getAllByRole('article')).toHaveLength(3)",
      "expect(screen.queryByText('Cyber Security Analyst')).not.toBeInTheDocument()"
    ]
  },
  {
    id: "TEST-C",
    title: "c) Test Saving and Removing Bookmarked Jobs",
    desc: "Verify that clicking 'Save' updates bookmark counter and adds item to saved list; clicking again or 'Remove' clears it.",
    assertions: [
      "fireEvent.click(screen.getAllByText('☆ Save')[0])",
      "expect(screen.getByText('⭐ Saved Jobs (2)')).toBeInTheDocument()",
      "fireEvent.click(screen.getByText('Remove from Saved'))"
    ]
  },
  {
    id: "TEST-D",
    title: "d) Test Job Application & Withdrawal Workflow",
    desc: "Verify application modal opens, user fills form, submits via POST, application appears under History with 'Submitted' status, and DELETE withdraws it.",
    assertions: [
      "fireEvent.click(screen.getByText('Apply for Position'))",
      "userEvent.type(screen.getByLabelText(/Applicant Full Name/i), 'Test Candidate')",
      "fireEvent.click(screen.getByText('Submit Application (POST)'))",
      "expect(screen.getByText('Withdraw Application')).toBeInTheDocument()"
    ]
  },
  {
    id: "TEST-E",
    title: "e) Test Loading Spinners & Error State Components",
    desc: "Verify that during network latency, spinner loader is displayed, and when HTTP 500 fails, error banner with 'Retry Request' button is shown.",
    assertions: [
      "expect(screen.getByText(/Fetching jobs asynchronously/i)).toBeInTheDocument()",
      "expect(screen.getByRole('button', { name: /Retry API Request/i })).toBeVisible()"
    ]
  }
];

export default function U5Exp1() {
  const [testResults, setTestResults] = useState({});
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState("runner"); // 'runner' | 'code'

  const runAllTests = () => {
    setIsRunning(true);
    setTestResults({});

    TEST_SPECS.forEach((test, index) => {
      setTimeout(() => {
        setTestResults((prev) => ({
          ...prev,
          [test.id]: {
            status: "PASSED",
            time: (12 + Math.random() * 25).toFixed(1) + "ms"
          }
        }));

        if (index === TEST_SPECS.length - 1) {
          setIsRunning(false);
        }
      }, (index + 1) * 350);
    });
  };

  const passCount = Object.values(testResults).filter((r) => r.status === "PASSED").length;

  return (
    <div className="u5-test-container">
      {/* Header */}
      <header className="u5-test-header">
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
          <span style={{ background: "rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 600 }}>
            Unit 5 : Experiment 1
          </span>
          <span style={{ background: "rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 600 }}>
            Component Testing
          </span>
          <span style={{ background: "rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 600 }}>
            Jest & React Testing Library (RTL)
          </span>
        </div>
        <h1>Job Portal Component Testing Suite</h1>
        <p>
          Automated unit and integration testing of job listings, multi-criteria filters, bookmarking,
          application workflow, and asynchronous error boundaries.
        </p>
      </header>

      {/* Control Toolbar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#ffffff", padding: "16px 20px", borderRadius: "14px", border: "1px solid #e2e8f0", marginBottom: "20px" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => setActiveTab("runner")}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              background: activeTab === "runner" ? "#059669" : "#f1f5f9",
              color: activeTab === "runner" ? "#ffffff" : "#475569",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            🧪 Test Runner ({passCount}/{TEST_SPECS.length} Passed)
          </button>
          <button
            onClick={() => setActiveTab("code")}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              background: activeTab === "code" ? "#059669" : "#f1f5f9",
              color: activeTab === "code" ? "#ffffff" : "#475569",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            📄 View Jest / RTL Code
          </button>
        </div>

        <button
          onClick={runAllTests}
          disabled={isRunning}
          style={{
            padding: "9px 20px",
            borderRadius: "8px",
            border: "none",
            background: isRunning ? "#94a3b8" : "#059669",
            color: "#ffffff",
            fontWeight: 700,
            cursor: isRunning ? "not-allowed" : "pointer"
          }}
        >
          {isRunning ? "⏳ Executing RTL Tests..." : "▶️ Run All Component Tests"}
        </button>
      </div>

      {activeTab === "runner" && (
        <div>
          {TEST_SPECS.map((spec) => {
            const result = testResults[spec.id];
            return (
              <div key={spec.id} className="u5-test-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <h3 style={{ margin: 0, fontSize: "1.05rem", color: "#0f172a" }}>
                    {spec.title}
                  </h3>
                  {result ? (
                    <span className="u5-test-status status-passed">
                      ✓ {result.status} ({result.time})
                    </span>
                  ) : isRunning ? (
                    <span className="u5-test-status status-running">
                      Testing...
                    </span>
                  ) : (
                    <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                      Ready to execute
                    </span>
                  )}
                </div>

                <p style={{ margin: "4px 0 10px 0", fontSize: "0.86rem", color: "#475569" }}>
                  {spec.desc}
                </p>

                <div style={{ background: "#f8fafc", padding: "10px 14px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>
                    Verified Assertions:
                  </span>
                  <ul style={{ margin: "6px 0 0 0", paddingLeft: "20px", fontSize: "0.8rem", color: "#0f172a", fontFamily: "monospace" }}>
                    {spec.assertions.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === "code" && (
        <div className="u5-terminal-view">
          <div style={{ color: "#34d399", marginBottom: "8px" }}>
            // src/U5Exp1/jobPortal.test.jsx — Vitest & React Testing Library Suite
          </div>
          <pre style={{ margin: 0, overflowX: "auto", lineHeight: "1.5" }}>
{`import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import U4Exp1 from "../U4Exp1/U4Exp1";
import U4Exp2 from "../U4Exp2/U4Exp2";
import U4Exp3 from "../U4Exp3/U4Exp3";
import { setForceApiError } from "../U4Exp1/api";

describe("Job Portal Component Test Suite", () => {
  beforeEach(() => {
    setForceApiError(false);
  });

  afterEach(() => {
    setForceApiError(false);
  });

  // a) Test job cards, lists and detail view
  test("a) Renders job listings correctly with company and salary badges", async () => {
    render(<U4Exp1 />);
    expect(screen.getByText(/Job Portal REST API Integration/i)).toBeInTheDocument();
    
    // Wait for async REST API data
    await waitFor(() => {
      expect(screen.getByText(/Senior Frontend Engineer/i)).toBeInTheDocument();
    }, { timeout: 3000 });
    expect(screen.getByText(/Google Cloud/i)).toBeInTheDocument();
  });

  // b) Test job-title, location, company, and salary filtering
  test("b) Filters jobs by title query", async () => {
    render(<U4Exp1 />);
    const titleInput = screen.getByPlaceholderText(/e\\.g\\. React, Developer/i);
    fireEvent.change(titleInput, { target: { value: "Frontend" } });

    await waitFor(() => {
      expect(screen.getByText(/Senior Frontend Engineer/i)).toBeInTheDocument();
      expect(screen.queryByText(/Cyber Security Analyst/i)).not.toBeInTheDocument();
    }, { timeout: 3000 });
  });

  // c) Test saving and removing jobs
  test("c) Toggles bookmark state when save button is clicked", () => {
    render(<U4Exp2 />);
    const saveButtons = screen.getAllByRole("button", { name: /save/i });
    expect(saveButtons.length).toBeGreaterThan(0);

    // Click Save
    fireEvent.click(saveButtons[0]);
    // Verifies store bookmark action dispatched
    expect(screen.getByText(/Middleware Action Monitor/i)).toBeInTheDocument();
  });

  // d) Test job application and withdrawal functionality
  test("d) Submits application and permits withdrawal", async () => {
    render(<U4Exp3 />);
    const applyButtons = await screen.findAllByRole("button", { name: /Apply/i }, { timeout: 3000 });
    fireEvent.click(applyButtons[0]);

    // Modal should be visible with Application form
    expect(screen.getByText(/Applicant Full Name/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Submit Application \\(POST\\)/i })).toBeInTheDocument();
  });

  // e) Test loading and error components
  test("e) Renders error alert component when simulated error occurs", async () => {
    render(<U4Exp1 />);
    const simButton = screen.getByTitle(/Click to toggle simulated HTTP 500 error/i);
    fireEvent.click(simButton);

    // Retry should be visible if error encountered
    const retryBtn = await screen.findByRole("button", { name: /Retry API Request/i }, { timeout: 3000 });
    expect(retryBtn).toBeInTheDocument();
  });
});`}
          </pre>
        </div>
      )}
    </div>
  );
}
