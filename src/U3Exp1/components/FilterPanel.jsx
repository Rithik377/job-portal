import React from "react";
import { BrowserRouter } from "react-router-dom";

function FilterPanel({ filters, setFilters }) {

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFilters({
      ...filters,
      [name]: value
    });
  };

  return (
    <BrowserRouter>
      <div className="filter-panel">

        <h3>Filter Jobs</h3>

        <label>Industry</label>

        <select
          name="industry"
          value={filters.industry}
          onChange={handleChange}
        >
          <option value="All">All</option>
          <option value="IT">IT</option>
          <option value="Cyber Security">
            Cyber Security
          </option>
          <option value="Data">Data</option>
          <option value="Design">Design</option>
        </select>

        <label>Experience</label>

        <select
          name="experience"
          value={filters.experience}
          onChange={handleChange}
        >
          <option value="All">All</option>
          <option value="0-2 Years">0-2 Years</option>
          <option value="2-4 Years">2-4 Years</option>
          <option value="4+ Years">4+ Years</option>
        </select>

        <label>Job Type</label>

        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
        >
          <option value="All">All</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Salary</label>

        <select
          name="salary"
          value={filters.salary}
          onChange={handleChange}
        >
          <option value="All">All</option>
          <option value="Below 5 LPA">Below 5 LPA</option>
          <option value="5-8 LPA">5-8 LPA</option>
          <option value="Above 8 LPA">Above 8 LPA</option>
        </select>

      </div>
    </BrowserRouter>
  );
}

export default FilterPanel;