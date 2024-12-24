import React from "react";
import { navLink } from "../utils/helper";
import PropTypes from "prop-types";

const NavNote = ({ activeTab, handleTabChange }) => {
  return (
    <>
      <div className="nav-note">
        {navLink.map(
          ({ link, label }) =>
            link !== "search" && (
              <h3
                key={link}
                className={`cursor-pointer ${
                  activeTab === link ? "active" : ""
                }`}
                onClick={() => handleTabChange(link)}
              >
                {label}
              </h3>
            )
        )}
      </div>
    </>
  );
};

NavNote.propTypes = {
  activeTab: PropTypes.string.isRequired,
  handleTabChange: PropTypes.func.isRequired,
};

export default NavNote;
