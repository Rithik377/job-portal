import React, { createContext, useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { useJobs } from "./useJobs";
import { useApplications } from "./useApplications";

const JobContext = createContext();

function JobProvider({ children }) {

  const jobs = useJobs();
  const applications = useApplications();

  return (
    <BrowserRouter>
      <JobContext.Provider
        value={{ ...jobs, ...applications }}
      >
        {children}
      </JobContext.Provider>
    </BrowserRouter>
  );
}

export const useJobContext = () =>
  useContext(JobContext);

export { JobProvider };