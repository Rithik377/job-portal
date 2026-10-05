import React from "react";

import { BrowserRouter } from "react-router-dom";

import { useJobContext } from "./JobContext";

function JobCard({ job }) {

  const {
    saveJob,
    applyJob
  } = useJobContext();

  return (

    <BrowserRouter>

      <div>

        <h3>{job.title}</h3>

        <p>Company: {job.company}</p>

        <p>Location: {job.location}</p>

        <p>Industry: {job.industry}</p>

        <p>Experience: {job.experience}</p>

        <p>Salary: ₹{job.salary} LPA</p>

        <p>Type: {job.type}</p>

        <button
          onClick={() => saveJob(job)}
        >
          Save
        </button>

        <button
          onClick={() => applyJob(job)}
        >
          Apply
        </button>

        <hr />

      </div>

    </BrowserRouter>
  );
}

export default JobCard;