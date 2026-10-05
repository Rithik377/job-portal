import React from "react";
import { Link } from "react-router-dom";
import Common from "./Common";

function Home({ user }) {
  return (
    <>
      <Common user={user} />

      <section className="hero">

        <div className="hero-content">

          <div className="hero-badge">
            ✨ Your career. Your future.
          </div>

          <h1>
            Find a job where
            <span> you belong.</span>
          </h1>

          <p>
            Discover opportunities from leading companies,
            apply in seconds and track your application journey
            from one place.
          </p>

          <div className="hero-buttons">

            <Link
              to={user ? "/dashboard" : "/login"}
              className="primary-btn"
            >
              Explore Jobs →
            </Link>

            <a href="#features" className="secondary-btn">
              How it works
            </a>

          </div>

          <div className="hero-trust">
            <span>✓ Easy applications</span>
            <span>✓ Application tracking</span>
            <span>✓ Smart job search</span>
          </div>

        </div>

        <div className="hero-card">

          <div className="floating-card card-one">
            <span className="small-icon">✓</span>

            <div>
              <strong>Application Sent</strong>
              <small>Frontend Developer</small>
            </div>
          </div>

          <div className="profile-preview">

            <div className="preview-top">
              <span>Application Overview</span>
              <span className="green-dot">●</span>
            </div>

            <div className="preview-number">
              3
            </div>

            <p>Active applications</p>

            <div className="preview-progress">
              <div></div>
            </div>

            <div className="preview-bottom">
              <span>Profile strength</span>
              <strong>85%</strong>
            </div>

          </div>

          <div className="floating-card card-two">
            <span className="fire">🔥</span>
            <div>
              <strong>12 new matches</strong>
              <small>Based on your profile</small>
            </div>
          </div>

        </div>

      </section>

      <section id="features" className="features">

        <div className="section-heading">
          <span>WHY JOBIFY</span>
          <h2>Everything you need for your next career move.</h2>
        </div>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon">🔎</div>
            <h3>Smart Job Search</h3>
            <p>
              Search jobs by title, company and location
              quickly.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Quick Apply</h3>
            <p>
              Apply directly from the job card without
              unnecessary steps.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Track Applications</h3>
            <p>
              Follow every application from submitted to
              interview and offer.
            </p>
          </div>

        </div>

      </section>
    </>
  );
}

export default Home;