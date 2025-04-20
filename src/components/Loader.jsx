import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({
  size = '50px',
  borderColor = '#2196f3',
  sideBorderColor = '#fff',
  borderWidth = '6px',
}) => {
  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'var(--background-color)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
    },
    loader: {
      width: size,
      height: size,
      border: `${borderWidth} solid ${sideBorderColor}`,
      borderTop: `${borderWidth} solid ${borderColor}`,
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.loader}></div>
    </div>
  );
};

Loader.propTypes = {
  size: PropTypes.string,
  borderColor: PropTypes.string,
  sideBorderColor: PropTypes.string,
  borderWidth: PropTypes.string,
};

export default Loader;