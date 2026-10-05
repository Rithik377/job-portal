import React, { useState, useMemo } from "react";
import { BrowserRouter } from "react-router-dom";

export function useJobs() {

  const [filters, setFilters] = useState({
    title: "",
    company: "",
    location: "",
    industry: "All",
    experience: "All",
    type: "All",
    salary: "All"
  });

  const jobs = [
    {
      id: 1,
      title: "React Developer",
      company: "TCS",
      location: "Chennai",
      industry: "IT",
      experience: "0-2 Years",
      type: "Full Time",
      salary: 6
    },
    {
      id: 2,
      title: "Cyber Security Analyst",
      company: "Infosys",
      location: "Bangalore",
      industry: "Cyber Security",
      experience: "2-4 Years",
      type: "Full Time",
      salary: 8
    },
    {
      id: 3,
      title: "Data Analyst",
      company: "Zoho",
      location: "Chennai",
      industry: "Data",
      experience: "0-2 Years",
      type: "Internship",
      salary: 4
    }
  ];

  const filteredJobs = useMemo(() => {

    return jobs.filter(job =>

      job.title.toLowerCase().includes(
        filters.title.toLowerCase()
      ) &&

      job.company.toLowerCase().includes(
        filters.company.toLowerCase()
      ) &&

      job.location.toLowerCase().includes(
        filters.location.toLowerCase()
      ) &&

      (filters.industry === "All" ||
        job.industry === filters.industry) &&

      (filters.experience === "All" ||
        job.experience === filters.experience) &&

      (filters.type === "All" ||
        job.type === filters.type) &&

      (
        filters.salary === "All" ||
        (filters.salary === "Below 5 LPA" &&
          job.salary < 5) ||
        (filters.salary === "5-8 LPA" &&
          job.salary >= 5 &&
          job.salary <= 8) ||
        (filters.salary === "Above 8 LPA" &&
          job.salary > 8)
      )

    );

  }, [filters]);

  return {
    jobs,
    filters,
    setFilters,
    filteredJobs
  };
}