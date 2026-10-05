import React, { useMemo } from "react";

import { BrowserRouter } from "react-router-dom";

import { useJobContext } from "./JobContext";

function Applications() {

  const {
    applications,
    withdrawApplication
  } = useJobContext();

  const count = useMemo(
    () => applications.length,
    [applications]
  );

  return (

    <BrowserRouter>

      <div>

        <h2>Applications ({count})</h2>

        {applications.length === 0 ? (

          <p>No applications submitted</p>

        ) : (

          applications.map(app => (

            <div key={app.jobId}>

              <p>
                {app.title} - {app.company}
              </p>

              <p>
                Status: {app.status}
              </p>

              <button
                onClick={() =>
                  withdrawApplication(app.jobId)
                }
              >
                Withdraw
              </button>

            </div>

          ))

        )}

      </div>

    </BrowserRouter>
  );
}

export default Applications;