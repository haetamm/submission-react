import React from 'react';
import { Link } from 'react-router-dom';
import { urlPage } from '../utils/constans';
import FormLogin from '../components/FormLogin';

const LoginPage = () => {
  return (
    <>
      <title>Login / XClone</title>
      <meta name="description" content="Login Page" />
      <FormLogin />
      <p className="small-text">
        Don&apos;t have an account?{' '}
        <Link to={urlPage.REGISTER} data-testid="register-link" className="link">
          Sign up
        </Link>
      </p>
    </>
  );
};

export default LoginPage;