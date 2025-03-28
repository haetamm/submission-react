import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { asyncUnsetAuthUser } from '../stores/authUser/action';

const Confirmation = ({ name, onClose }) => {
  const dispatch = useDispatch();

  const handleButton = async () => {
    dispatch(asyncUnsetAuthUser());
    onClose();
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
  onClose: PropTypes.func.isRequired,
};

export default Confirmation;