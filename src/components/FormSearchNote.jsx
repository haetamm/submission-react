import React, { useState } from "react";
import PropTypes from "prop-types";

const FormSearchNote = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <>
      <section className="section-search">
        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
          <div className="wrap-input">
            <input
              value={query}
              onChange={handleInputChange}
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

FormSearchNote.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default FormSearchNote;
