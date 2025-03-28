import React, { useContext } from 'react';
import { FaPencil } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { translatedNames } from '../utils/lang';
import usePermission from '../hooks/usePermission';
import { urlPage } from '../utils/constans';
import { useDispatch } from 'react-redux';
import { openModal } from '../stores/modal/action';
import { BsDoorOpenFill } from 'react-icons/bs';

const ButtonCreate = () => {
  const dispatch = useDispatch();
  const { language } = useContext(AppContext);
  const { isAuthenticated } = usePermission();

  const handleAddThreadClick = () => {
    if (isAuthenticated) {
      dispatch(openModal('add'));
    }
  };

  const buttonLabel = isAuthenticated
    ? translatedNames[language]['Tambah']
    : translatedNames[language]['buttonLog'];

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
    >
      {buttonContent}
    </button>
  ) : (
    <Link
      to={urlPage.LOGIN}
      className="custom-button cursor-pointer"
      aria-label="add thread"
    >
      {buttonContent}
    </Link>
  );
};

export default ButtonCreate;