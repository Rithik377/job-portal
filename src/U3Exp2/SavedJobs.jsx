import React, { useMemo } from "react";

import { BrowserRouter } from "react-router-dom";

import { useJobContext } from "./JobContext";

function SavedJobs() {

  const {
    savedJobs,
    removeSavedJob
  } = useJobContext();

  const count = useMemo(
    () => savedJobs.length,
    [savedJobs]
  );

  return (

    <BrowserRouter>

      <div>

        <h2>Saved Jobs ({count})</h2>

        {savedJobs.length === 0 ? (

          <p>No saved jobs</p>

        ) : (

          savedJobs.map(job => (

            <div key={job.id}>

              <p>
                {job.title} - {job.company}
              </p>

              <button
                onClick={() =>
                  removeSavedJob(job.id)
                }
              >
                Remove
              </button>

            </div>

          ))

        )}

      </div>

    </BrowserRouter>
  );
}

export default SavedJobs;