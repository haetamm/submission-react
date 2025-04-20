import React, {  } from 'react';
import { FaPencil } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import usePermission from '../hooks/usePermission';
import { typeModal, urlPage } from '../utils/constans';
import { useDispatch } from 'react-redux';
import { openModal } from '../stores/modal/action';
import { BsDoorOpenFill } from 'react-icons/bs';

const ButtonCreate = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = usePermission();

  const handleAddThreadClick = () => {
    if (isAuthenticated) {
      dispatch(openModal(typeModal.ADD));
    }
  };

  const buttonLabel = isAuthenticated
    ? 'Create Thread'
    : 'Login';

  const Icon = isAuthenticated ? FaPencil : BsDoorOpenFill;

  const buttonContent = (
    <>
      <Icon className="h-8 w-8 button-icon" />
      <div className="button-label">{buttonLabel}</div>
    </>
  );

  return isAuthenticated ? (
    <button
      onClick={handleAddThreadClick}
      className="custom-button cursor-pointer"
      aria-label="add thread"
      data-testid="add-thread"
    >
      {buttonContent}
    </button>
  ) : (
    <Link
      to={urlPage.LOGIN}
      className="custom-button cursor-pointer"
      aria-label="add thread"
      data-testid="login-link"
    >
      {buttonContent}
    </Link>
  );
};

export default ButtonCreate;