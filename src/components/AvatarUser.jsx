import React from "react";
import PropTypes from "prop-types";

const AvatarUser = ({ img }) => {
  return (
    <>
      <img
        src={`${
          img
            ? img
            : "https://pbs.twimg.com/profile_images/1269621458822664192/NHV_D34w_400x400.jpg"
        }`}
        alt="AvatarUser"
        height={40}
      />
    </>
  );
};

AvatarUser.propTypes = {
  img: PropTypes.string.isRequired,
};

export default AvatarUser;
