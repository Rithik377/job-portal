import React, { useState } from "react";
import {
  useParams,
  useNavigate,
  Link
} from "react-router-dom";

import Common from "./Common";

function Application({
  user,
  jobs,
  applications,
  setApplications
}) {

  const { id } = useParams();

  const navigate = useNavigate();

  const job = jobs.find(
    (item) => item.id === Number(id)
  );

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("");
  const [cover, setCover] = useState("");

  if (!job) {
    return <h2>Job not found</h2>;
  }

  const submitApplication = (e) => {

    e.preventDefault();

    const application = {
      id: Date.now(),
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      name,
      email,
      phone,
      experience,
      cover,
      status: "Application Submitted"
    };

    setApplications([
      ...applications,
      application
    ]);

    navigate("/dashboard");
  };

  return (
    <>
      <Common user={user} />

      <main className="application-page">

        <Link
          to="/dashboard"
          className="back-link"
        >
          ← Back to jobs
        </Link>

        <div className="application-layout">

          <section className="application-form-card">

            <div className="application-heading">

              <span className="form-badge">
                QUICK APPLY
              </span>

              <h1>
                Apply for {job.title}
              </h1>

              <p>
                Complete your application for
                <strong> {job.company}</strong>.
              </p>

            </div>

            <form onSubmit={submitApplication}>

              <div className="form-grid">

                <div className="form-field">

                  <label>Full Name</label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    required
                  />

                </div>

                <div className="form-field">

                  <label>Email</label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    required
                  />

                </div>

              </div>

              <div className="form-grid">

                <div className="form-field">

                  <label>Phone Number</label>

                  <input
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value)
                    }
                    required
                  />

                </div>

                <div className="form-field">

                  <label>Experience</label>

                  <select
                    value={experience}
                    onChange={(e) =>
                      setExperience(e.target.value)
                    }
                    required
                  >

                    <option value="">
                      Select experience
                    </option>

                    <option>
                      Fresher
                    </option>

                    <option>
                      1-2 Years
                    </option>

                    <option>
                      3-5 Years
                    </option>

                    <option>
                      5+ Years
                    </option>

                  </select>

                </div>

              </div>

              <div className="form-field">

                <label>Cover Message</label>

                <textarea
                  placeholder="Tell the recruiter why you're a good fit..."
                  value={cover}
                  onChange={(e) =>
                    setCover(e.target.value)
                  }
                  rows="5"
                />

              </div>

              <button
                type="submit"
                className="submit-application"
              >
                Submit Application →
              </button>

            </form>

          </section>

          <aside className="application-preview">

            <p className="eyebrow">
              JOB DETAILS
            </p>

            <div className="preview-company">

              <div className="company-logo large">
                {job.logo}
              </div>

              <div>
                <h2>{job.title}</h2>
                <p>{job.company}</p>
              </div>

            </div>

            <div className="preview-info">

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

            <hr />

            <h3>Application process</h3>

            <div className="process">

              <div className="process-item active">
                <span>1</span>
                <p>Application</p>
              </div>

              <div className="process-item">
                <span>2</span>
                <p>Review</p>
              </div>

              <div className="process-item">
                <span>3</span>
                <p>Interview</p>
              </div>

              <div className="process-item">
                <span>4</span>
                <p>Decision</p>
              </div>

            </div>

          </aside>

        </div>

      </main>
    </>
  );
}

export default Application;