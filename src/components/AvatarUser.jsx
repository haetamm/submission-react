import React from 'react';
import PropTypes from 'prop-types';

const AvatarUser = ({ img, size = '40px', borderRadius = '100%' }) => {
  return (
    <>
      <img
        data-testid="avatar"
        src={img || 'https://pbs.twimg.com/profile_images/1269621458822664192/NHV_D34w_400x400.jpg'}
        alt="AvatarUser"
        style={{
          width: size,
          height: size,
          borderRadius,
          objectFit: 'cover',
        }}
      />
    </>
  );
};

AvatarUser.propTypes = {
  img: PropTypes.string,
  size: PropTypes.string,
  borderRadius: PropTypes.string,
};

export default AvatarUser;