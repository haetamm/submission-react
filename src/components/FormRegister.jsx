import React, { useContext, useState } from "react";
import InputCustom from "./InputCustom";
import useInput from "../hooks/useInput";
import { translatedNames } from "../utils/lang";
import { AppContext } from "../contexts/AppContext";
import { register } from "../utils/api";
import { useNavigate } from "react-router-dom";

const FormRegister = () => {
  const { language } = useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    value: name,
    handleChange: handleNameChange,
    error: nameError,
  } = useInput("name");

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

  const {
    value: passwordConfirmation,
    handleChange: handlePasswordConfirmationChange,
    error: passwordConfirmationError,
  } = useInput("passwordConfirmation", "", password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !nameError &&
      !emailError &&
      !passwordError &&
      !passwordConfirmationError
    ) {
      const payload = {
        name,
        email,
        password,
      };
      const { error } = await register(payload, setLoading);
      if (!error) {
        navigate("/guest/login");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputCustom
          type="text"
          name="name"
          value={name}
          handleChange={handleNameChange}
          error={nameError}
        />

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

        <InputCustom
          type="password"
          name="passwordConfirmation"
          value={passwordConfirmation}
          handleChange={handlePasswordConfirmationChange}
          error={passwordConfirmationError}
        />

        <button
          disabled={
            !name || !email || !password || !passwordConfirmation || loading
          }
          className="button create-account"
        >
          {loading ? "Loading" : translatedNames[language]["buttonReg"]}
        </button>
      </form>
    </>
  );
};

export default FormRegister;
