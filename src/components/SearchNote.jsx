import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { translatedNames } from "../utils/lang";
import { FaSearch } from "react-icons/fa";

const SearchNote = () => {
  const { language } = useContext(AppContext);
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
              placeholder={translatedNames[language]["search"]}
              type="search"
            />
          </div>
          <button type="submit" className="cursor-pointer search-button">
            <FaSearch />
          </button>
        </form>
        <div className="search-note"></div>
      </section>
    </>
  );
};

export default SearchNote;
