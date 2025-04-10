import React from 'react';
import useLanguage from '../hooks/useLanguage';
import PropTypes from 'prop-types';
import '../styles/category.css';
import { translatedNames } from '../utils/lang';
import { Link } from 'react-router-dom';
import { urlPage } from '../utils/constans';

const CategoryList = ({ categories, threads }) => {
  const language = useLanguage();

  return (
    <>
      <h3>{translatedNames[language]['Judul Pencarian']}</h3>
      <div className="trending-categories">
        {categories.map((category) => (
          <div key={category} className="trending-item">
            <div className="trending-title">
              <Link to={`${urlPage.SEARCH}?category=${encodeURIComponent(category)}`}>#{category}</Link>
            </div>
            <div className="trending-stats">
              {threads.filter((thread) => thread.category === category).length} threads
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  threads: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CategoryList;