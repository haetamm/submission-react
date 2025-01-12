import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchNote = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?title=${encodeURIComponent(query)}`);
      setQuery("");
    }
  };
  return (
    <>
      <section className="section-search">
        <form onSubmit={handleSubmit} className="search-form">
          <div className="wrap-input">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari Catatan"
              type="search"
            />
          </div>
          <button type="submit" className="cursor-pointer">
            Cari
          </button>
        </form>
        <div className="search-note"></div>
      </section>
    </>
  );
};

export default SearchNote;
