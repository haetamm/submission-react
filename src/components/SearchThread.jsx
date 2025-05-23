import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { urlPage } from '../utils/constans';

const SearchThread = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`${urlPage.SEARCH}?title=${encodeURIComponent(query)}`);
      setQuery('');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="search-form">
        <div className="wrap-input">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search Thread'
            type="search"
          />
        </div>
        <button type="submit" className="cursor-pointer search-button">
          <FaSearch />
        </button>
      </form>
      <div className="search-thread"></div>
    </>
  );
};

export default SearchThread;
