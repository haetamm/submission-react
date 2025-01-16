import React from "react";
import FormLogin from "../components/FormLogin";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <>
      <FormLogin />
      <p className="small-text">
        Don&apos;t have an account?{" "}
        <Link to="/guest/register" className="link">
          Sign up
        </Link>
      </p>
    </>
  );
};

export default LoginPage;
