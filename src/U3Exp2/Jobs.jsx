import React from "react";

import { BrowserRouter } from "react-router-dom";

import { useJobContext } from "./JobContext";

import JobSearch from "./JobSearch";
import JobCard from "./JobCard";
import SavedJobs from "./SavedJobs";
import Applications from "./Applications";
import JobAlerts from "./JobAlerts";

function Jobs() {

  const {
    filteredJobs
  } = useJobContext();

  return (

    <BrowserRouter>

      <div>

        <h1>Job Portal</h1>

        <JobSearch />

        <h2>Available Jobs</h2>

        {filteredJobs.length === 0 ? (

          <p>No jobs found</p>

        ) : (

          filteredJobs.map(job => (

            <JobCard
              key={job.id}
              job={job}
            />

          ))

        )}

        <SavedJobs />

        <Applications />

        <JobAlerts />

      </div>

    </BrowserRouter>
  );
}

export default Jobs; 