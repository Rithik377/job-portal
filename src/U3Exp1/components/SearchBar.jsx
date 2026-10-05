import React, { useRef, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

function SearchBar({ keyword, setKeyword }) {

  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  return (
    <BrowserRouter>
      <div className="search-container">

        <input
          ref={searchRef}
          type="text"
          placeholder="Search jobs..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <button onClick={() => searchRef.current?.focus()}>
          Search
        </button>

      </div>
    </BrowserRouter>
  );
}

export default SearchBar;