import React from 'react';
import InputCustom from './InputCustom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../utils/validation';
import { loginFields } from '../utils/fields';
import { useDispatch, useSelector } from 'react-redux';
import { asyncSetAuthUser } from '../stores/authUser/action';
import { useNavigate } from 'react-router-dom';

const FormLogin = () => {
  const loading = useSelector((state) => state.authUser.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
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
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {loginFields.map(({ name, type, label }) => (
          <Controller
            key={name}
            name={name}
            control={control}
            render={({ field }) => (
              <InputCustom
                type={type}
                label={label}
                {...field}
                error={errors[name]?.message}
              />
            )}
          />
        ))}

        <button
          className="button create-account"
          disabled={loading}
        >
          {loading ? 'Loading' : 'Login'}
        </button>
      </form>
    </>
  );
};

export default FormLogin;