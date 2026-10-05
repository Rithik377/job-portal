import React from "react";

import { BrowserRouter } from "react-router-dom";

import { useJobContext } from "./JobContext";

function JobSearch() {

  const {
    filters,
    setFilters
  } = useJobContext();

  const change = (e) => {

    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });

  };

  return (

    <BrowserRouter>

      <div>

        <h2>Search Jobs</h2>

        <input
          name="title"
          placeholder="Job Title"
          value={filters.title}
          onChange={change}
        />

        <input
          name="company"
          placeholder="Company"
          value={filters.company}
          onChange={change}
        />

        <input
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={change}
        />

        <br /><br />

        <select
          name="industry"
          value={filters.industry}
          onChange={change}
        >
          <option>All</option>
          <option>IT</option>
          <option>Cyber Security</option>
          <option>Data</option>
        </select>

        <select
          name="experience"
          value={filters.experience}
          onChange={change}
        >
          <option>All</option>
          <option>0-2 Years</option>
          <option>2-4 Years</option>
          <option>4+ Years</option>
        </select>

        <select
          name="type"
          value={filters.type}
          onChange={change}
        >
          <option>All</option>
          <option>Full Time</option>
          <option>Part Time</option>
          <option>Internship</option>
        </select>

        <select
          name="salary"
          value={filters.salary}
          onChange={change}
        >
          <option>All</option>
          <option>Below 5 LPA</option>
          <option>5-8 LPA</option>
          <option>Above 8 LPA</option>
        </select>

      </div>

    </BrowserRouter>
  );
}

export default JobSearch; 