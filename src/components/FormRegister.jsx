import React from 'react';
import InputCustom from './InputCustom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../utils/validation';
import { registerFields } from '../utils/fields';
import { useDispatch, useSelector } from 'react-redux';
import { asyncRegisterUser } from '../stores/user/action';
import { useNavigate } from 'react-router-dom';
import useLanguage from '../hooks/useLanguage';
import { translatedNames } from '../utils/lang';

const FormRegister = () => {
  const language = useLanguage();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.users.loading);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  const onSubmit = (data) => {
    dispatch(asyncRegisterUser(data, navigate));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {registerFields.map(({ name, type }) => (
          <Controller
            key={name}
            name={name}
            control={control}
            render={({ field }) => (
              <InputCustom
                type={type}
                label={translatedNames[language][name]}
                {...field}
                error={errors[name]?.message}
              />
            )}
          />
        ))}

        <button
          className="button create-account"
          disabled={!isValid || isSubmitting || loading}
        >
          {loading ? 'Loading' : translatedNames[language]['buttonReg']}
        </button>
      </form>
    </>
  );
};

export default FormRegister;