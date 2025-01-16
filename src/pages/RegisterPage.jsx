import React from "react";
import FormRegister from "../components/FormRegister";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <>
      <FormRegister />
      <p className="small-text">
        Already have an account?{" "}
        <Link to={"/guest/login"} className="link">
          Sign in
        </Link>
      </p>
      <p className="small-text">
        By signing up, you agree to the{" "}
        <span className="link">Terms of Service</span> and{" "}
        <span className="link">Privacy Policy</span>, including{" "}
        <span className="link">Cookie Use</span>.
      </p>
    </>
  );
};

export default RegisterPage;
