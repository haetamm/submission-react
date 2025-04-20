import React from 'react';
import InputCustom from './InputCustom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../utils/validation';
import { registerFields } from '../utils/fields';
import { useDispatch, useSelector } from 'react-redux';
import { asyncRegisterUser } from '../stores/user/action';
import { useNavigate } from 'react-router-dom';

const FormRegister = () => {
  const navigate = useNavigate();
  const loading = useSelector((state) => state.users.loading);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
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
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {registerFields.map(({ name, type, label }) => (
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
          {loading ? 'Loading' : 'Create Account'}
        </button>
      </form>
    </>
  );
};

export default FormRegister;