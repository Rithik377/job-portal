import React from "react";
import { BrowserRouter, Link } from "react-router-dom";

function JobCard({
  job,
  isSaved,
  saveJob,
  removeSavedJob
}) {

  return (
    <BrowserRouter>
      <div className="job-card">

        <h3>{job.title}</h3>

        <p>Company: {job.company}</p>
        <p>Location: {job.location}</p>
        <p>Salary: ₹{job.salary}</p>
        <p>Experience: {job.experience}</p>
        <p>Job Type: {job.type}</p>
        <p>Rating: ⭐ {job.rating}</p>

        <div>
          {job.skills.map((skill, index) => (
            <span key={index}>
              {skill}{" "}
            </span>
          ))}
        </div>

        <br />

        <Link to={`/job/${job.id}`}>
          View Details
        </Link>

        {" "}

        {isSaved ? (
          <button onClick={() => removeSavedJob(job.id)}>
            Remove
          </button>
        ) : (
          <button onClick={() => saveJob(job.id)}>
            Save Job
          </button>
        )}

      </div>
    </BrowserRouter>
  );
}

export default JobCard;