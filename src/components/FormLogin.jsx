import React from 'react';
import InputCustom from './InputCustom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../utils/validation';
import { loginFields } from '../utils/fields';
import { useDispatch, useSelector } from 'react-redux';
import { asyncSetAuthUser } from '../stores/authUser/action';
import { useNavigate } from 'react-router-dom';
import { translatedNames } from '../utils/lang';
import useLanguage from '../hooks/useLanguage';

const FormLogin = () => {
  const language = useLanguage();
  const loading = useSelector((state) => state.authUser.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data) => {
    dispatch(asyncSetAuthUser(data, navigate));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {loginFields.map(({ name, type }) => (
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
          {loading ? 'Loading' : translatedNames[language]['buttonLog']}
        </button>
      </form>
    </>
  );
};

export default FormLogin;