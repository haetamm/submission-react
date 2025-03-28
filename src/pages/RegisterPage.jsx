import React from 'react';
import { Link } from 'react-router-dom';
import { urlPage } from '../utils/constans';
import FormRegister from '../components/FormRegister';

const RegisterPage = () => {
  return (
    <>
      <title>Register / XClone</title>
      <meta name="description" content="Register Page" />
      <FormRegister />
      <p className="small-text">
        Already have an account?{' '}
        <Link to={urlPage.LOGIN} className="link">
          Sign in
        </Link>
      </p>
      <p className="small-text">
        By signing up, you agree to the{' '}
        <span className="link">Terms of Service</span> and{' '}
        <span className="link">Privacy Policy</span>, including{' '}
        <span className="link">Cookie Use</span>.
      </p>
    </>
  );
};

export default RegisterPage;