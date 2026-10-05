import React, {
  useState,
  useEffect,
  useCallback
} from "react";

import { BrowserRouter } from "react-router-dom";

export function useApplications() {

  const [savedJobs, setSavedJobs] = useState(
    JSON.parse(localStorage.getItem("savedJobs")) || []
  );

  const [applications, setApplications] = useState(
    JSON.parse(localStorage.getItem("applications")) || []
  );

  const [alerts, setAlerts] = useState(
    JSON.parse(localStorage.getItem("alerts")) || []
  );

  useEffect(() => {

    localStorage.setItem(
      "savedJobs",
      JSON.stringify(savedJobs)
    );

  }, [savedJobs]);

  useEffect(() => {

    localStorage.setItem(
      "applications",
      JSON.stringify(applications)
    );

  }, [applications]);

  useEffect(() => {

    localStorage.setItem(
      "alerts",
      JSON.stringify(alerts)
    );

  }, [alerts]);

  const saveJob = useCallback((job) => {

    setSavedJobs(oldJobs => {

      if (oldJobs.some(item => item.id === job.id)) {
        return oldJobs;
      }

      return [...oldJobs, job];

    });

  }, []);

  const removeSavedJob = useCallback((id) => {

    setSavedJobs(oldJobs =>
      oldJobs.filter(job => job.id !== id)
    );

  }, []);

  const applyJob = useCallback((job) => {

    setApplications(oldApplications => {

      if (
        oldApplications.some(
          app => app.jobId === job.id
        )
      ) {
        return oldApplications;
      }

      return [
        ...oldApplications,
        {
          jobId: job.id,
          title: job.title,
          company: job.company,
          status: "Applied"
        }
      ];

    });

  }, []);

  const withdrawApplication = useCallback((id) => {

    setApplications(oldApplications =>
      oldApplications.filter(
        app => app.jobId !== id
      )
    );

  }, []);

  const createJobAlert = useCallback((alert) => {

    setAlerts(oldAlerts => [
      ...oldAlerts,
      alert
    ]);

  }, []);

  return {
    savedJobs,
    applications,
    alerts,
    saveJob,
    removeSavedJob,
    applyJob,
    withdrawApplication,
    createJobAlert
  };
}