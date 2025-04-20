import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { threadSchema } from '../utils/validation';
import { useDispatch } from 'react-redux';
import { asyncAddThread } from '../stores/thread/action';
import { threadFields } from '../utils/fields';
import InputCustom from './InputCustom';
import QuillEditor from './QuillEditor';

const FormThread = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(threadSchema),
    defaultValues: {
      title: '',
      category: '',
      body: '',
    },
  });

  const onSubmit = (data) => {
    dispatch(asyncAddThread(data, setLoading));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {threadFields.map(({ name, type, label }) => (
        <Controller
          key={name}
          name={name}
          control={control}
          render={({ field }) =>
            type === 'textarea' ? (
              <div className="input-custom-wrapper">
                <QuillEditor field={field} />
                {errors[name] && (
                  <span data-testid={`${name}-error`} className="error-message">{errors[name]?.message}</span>
                )}
              </div>
            ) : (
              <InputCustom
                type={type}
                label={label}
                {...field}
                error={errors[name]?.message}
              />
            )
          }
        />
      ))}

      <button
        className="button create-account"
        disabled={loading}
      >
        {loading ? 'Loading' : 'Create Thread'}
      </button>
    </form>
  );
};

export default FormThread;