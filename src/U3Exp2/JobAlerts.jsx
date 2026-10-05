import React, { useState } from "react";

import { BrowserRouter } from "react-router-dom";

import { useJobContext } from "./JobContext";

function JobAlerts() {

  const {
    alerts,
    createJobAlert
  } = useJobContext();

  const [keyword, setKeyword] = useState("");

  const addAlert = () => {

    if (keyword.trim() !== "") {

      createJobAlert({
        keyword: keyword
      });

      setKeyword("");
    }

  };

  return (

    <BrowserRouter>

      <div>

        <h2>Job Alerts</h2>

        <input
          placeholder="Job Keyword"
          value={keyword}
          onChange={e =>
            setKeyword(e.target.value)
          }
        />

        <button onClick={addAlert}>
          Create Alert
        </button>

        {alerts.length === 0 ? (

          <p>No job alerts available</p>

        ) : (

          alerts.map((alert, index) => (

            <p key={index}>
              Alert: {alert.keyword}
            </p>

          ))

        )}

      </div>

    </BrowserRouter>
  );
}

export default JobAlerts;