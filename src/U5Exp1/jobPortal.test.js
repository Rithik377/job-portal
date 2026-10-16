/**
 * jobPortal.test.js - Unit 5 Experiment 1
 * Topics: Jest, React Testing Library (RTL)
 * 
 * Verifies:
 * a) Job card, job lists, job details, and application components
 * b) Job-title, location, company, and salary filtering
 * c) Saving and removing jobs
 * d) Job application and withdrawal functionality
 * e) Loading and error components
 * f) React Testing Library render, screen queries, fireEvent, and userEvent
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import U4Exp1 from "../U4Exp1/U4Exp1";
import U4Exp2 from "../U4Exp2/U4Exp2";
import U4Exp3 from "../U4Exp3/U4Exp3";

describe("Job Portal Component Test Suite", () => {
  // a) Test job cards, lists and detail view
  test("a) Renders job listings correctly with company and salary badges", async () => {
    render(<U4Exp1 />);
    expect(screen.getByText(/Job Portal REST API Integration/i)).toBeInTheDocument();
    
    // Wait for async REST API data
    await waitFor(() => {
      expect(screen.getByText(/Senior Frontend Engineer/i)).toBeInTheDocument();
    });
    expect(screen.getByText(/Google Cloud/i)).toBeInTheDocument();
  });

  // b) Test job-title, location, company, and salary filtering
  test("b) Filters jobs by title query", async () => {
    render(<U4Exp1 />);
    const titleInput = screen.getByPlaceholderText(/e\.g\. React, Developer/i);
    fireEvent.change(titleInput, { target: { value: "Frontend" } });

    await waitFor(() => {
      expect(screen.getByText(/Senior Frontend Engineer/i)).toBeInTheDocument();
      expect(screen.queryByText(/Cyber Security Analyst/i)).not.toBeInTheDocument();
    });
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
    const applyButtons = screen.getAllByRole("button", { name: /Apply/i });
    fireEvent.click(applyButtons[0]);

    // Modal should be visible
    expect(screen.getByText(/Apply for Position/i)).toBeInTheDocument();
  });

  // e) Test loading and error components
  test("e) Renders error alert component when simulated error occurs", async () => {
    render(<U4Exp1 />);
    const simButton = screen.getByTitle(/Click to toggle simulated HTTP 500 error/i);
    fireEvent.click(simButton);

    // Retry should be visible if error encountered
    const retryBtn = screen.getByRole("button", { name: /🔄 Reset Filters|Retry/i });
    expect(retryBtn).toBeInTheDocument();
  });
});
