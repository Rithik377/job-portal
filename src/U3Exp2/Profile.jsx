import React, { useMemo } from "react";

import { BrowserRouter } from "react-router-dom";

import { useJobContext } from "./JobContext";

function Profile() {

  const {
    applications,
    savedJobs
  } = useJobContext();

  const applicationCount = useMemo(
    () => applications.length,
    [applications]
  );

  const statusSummary = useMemo(() => {

    const result = {};

    applications.forEach(app => {

      result[app.status] =
        (result[app.status] || 0) + 1;

    });

    return result;

  }, [applications]);

  return (

    <BrowserRouter>

      <div>

        <h1>Profile</h1>

        <h2>
          Saved Jobs: {savedJobs.length}
        </h2>

        <h2>
          Applications: {applicationCount}
        </h2>

        <h2>Application Status</h2>

        {applicationCount === 0 ? (

          <p>No applications submitted</p>

        ) : (

          Object.entries(statusSummary).map(
            ([status, count]) => (

              <p key={status}>
                {status}: {count}
              </p>

            )
          )

        )}

      </div>

    </BrowserRouter>
  );
}

export default Profile;