import React from 'react';
import PropTypes from 'prop-types';
import '../styles/category.css';
import { Link } from 'react-router-dom';
import { urlPage } from '../utils/constans';

const CategoryList = ({ categories, threads }) => {

  return (
    <>
      <h3>Enter a title in the search input to find thread.</h3>
      <div data-testid="trending-categories" className="trending-categories">
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