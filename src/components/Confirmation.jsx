import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { asyncUnsetAuthUser } from '../stores/authUser/action';

const Confirmation = ({ name }) => {
  const dispatch = useDispatch();

  const handleButton = async () => {
    dispatch(asyncUnsetAuthUser());
  };

  return (
    <>
      <button onClick={handleButton} className="cursor-pointer btn-delete">
        {name}
      </button>
    </>
  );
};

Confirmation.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Confirmation;