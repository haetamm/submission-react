import React, { useContext, useState } from "react";
import InputCustom from "./InputCustom";
import useInput from "../hooks/useInput";
import { translatedNames } from "../utils/lang";
import { AppContext } from "../contexts/AppContext";
import { login } from "../utils/api";

const FormLogin = () => {
  const { language } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const {
    value: email,
    handleChange: handleEmailChange,
    error: emailError,
  } = useInput("email");

  const {
    value: password,
    handleChange: handlePasswordChange,
    error: passwordError,
  } = useInput("password");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailError || !passwordError) {
      const { error } = await login({ email, password }, setLoading);
      if (!error) {
        window.location.assign("/");
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputCustom
          type="email"
          name="email"
          value={email}
          handleChange={handleEmailChange}
          error={emailError}
        />

        <InputCustom
          type="password"
          name="password"
          value={password}
          handleChange={handlePasswordChange}
          error={passwordError}
        />

        <button
          disabled={!email || !password}
          className="button create-account"
        >
          {loading ? "Loading" : translatedNames[language]["buttonLog"]}
        </button>
      </form>
    </>
  );
};

export default FormLogin;
