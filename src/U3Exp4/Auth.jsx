import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./U3Exp4.css";
import "./U3Exp4.css";

function Auth({ setUser }) {
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    /* =========================
       SIGN UP
    ========================= */

    if (isSignup) {

      // Check existing account
      const savedUser =
        localStorage.getItem("jobifyUser");

      if (savedUser) {
        const existingUser =
          JSON.parse(savedUser);

        if (
          existingUser.email.toLowerCase() ===
          email.trim().toLowerCase()
        ) {
          alert(
            "Account already exists with this email. Please Sign In."
          );

          return;
        }
      }

      // Password validation
      if (password.length < 6) {
        alert(
          "Password must contain at least 6 characters."
        );

        return;
      }

      // Confirm password
      if (password !== confirmPassword) {
        alert("Passwords do not match.");

        return;
      }

      // Create account
      const newUser = {
        name: name.trim(),
        email: email.trim(),
        password: password
      };

      localStorage.setItem(
        "jobifyUser",
        JSON.stringify(newUser)
      );

      // Login automatically
      setUser({
        name: newUser.name,
        email: newUser.email
      });

      alert("Account created successfully!");

      navigate("/dashboard");

      return;
    }

    /* =========================
       LOGIN
    ========================= */

    const savedUser =
      localStorage.getItem("jobifyUser");

    if (!savedUser) {
      alert(
        "No account found. Please Sign Up first."
      );

      return;
    }

    const existingUser =
      JSON.parse(savedUser);

    if (
      email.trim().toLowerCase() ===
        existingUser.email.toLowerCase() &&
      password === existingUser.password
    ) {

      setUser({
        name: existingUser.name,
        email: existingUser.email
      });

      navigate("/dashboard");

    } else {

      alert(
        "Invalid email or password."
      );
    }
  };

  /* =========================
     SWITCH TO SIGNUP
  ========================= */

  const openSignup = () => {
    setIsSignup(true);

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  /* =========================
     SWITCH TO LOGIN
  ========================= */

  const openLogin = () => {
    setIsSignup(false);

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        {/* LOGO */}

        <div className="auth-logo">
          J
        </div>

        {/* TITLE */}

        <h1>
          {isSignup
            ? "Create Your Account"
            : "Welcome Back"}
        </h1>

        <p className="auth-subtitle">
          {isSignup
            ? "Create your Jobify account and start your career journey."
            : "Sign in to continue your career journey with Jobify."}
        </p>

        {/* FORM */}

        <form onSubmit={handleSubmit}>

          {/* NAME */}

          {isSignup && (
            <>
              <label>Full Name</label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
              />
            </>
          )}

          {/* EMAIL */}

          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          {/* PASSWORD */}

          <label>Password</label>

          <input
            type="password"
            placeholder={
              isSignup
                ? "Minimum 6 characters"
                : "Enter your password"
            }
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          {/* CONFIRM PASSWORD */}

          {isSignup && (
            <>
              <label>
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                required
              />
            </>
          )}

          {/* BUTTON */}

          <button
            type="submit"
            className="primary-btn full-btn"
          >
            {isSignup
              ? "Create Account →"
              : "Sign In →"}
          </button>

        </form>

        {/* SWITCH */}

        <div className="auth-switch">

          {isSignup ? (
            <p>
              Already have an account?

              <button
                type="button"
                onClick={openLogin}
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?

              <button
                type="button"
                onClick={openSignup}
              >
                Sign Up
              </button>
            </p>
          )}

        </div>

        {/* FOOTER */}

        <p className="auth-note">
          Secure authentication • Jobify Career Portal
        </p>

      </div>

    </div>
  );
}

export default Auth;