import React, { useRef, useEffect, useState } from 'react';
import '../styles/form-reply.css';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { commentSchema } from '../utils/validation';
import { useDispatch, useSelector } from 'react-redux';
import { asyncAddComment } from '../stores/comment/action';
import { handleTextareaChange } from '../utils/helper';

const FormComment = ({ id, owner }) => {
  const { authUser } = useSelector((state) => state.authUser);
  const textareaRef = useRef(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: '',
    },
  });

  const onSubmit = (data) => {
    dispatch(asyncAddComment({ data, id, setLoading, reset }));
  };

  useEffect(() => {
    if (textareaRef.current) {
      handleTextareaChange({ target: textareaRef.current });
    }
  }, []);

  return (
    <div className="reply-section">
      <div className="reply-header">
        <span>
          Replying to <span>{owner?.name}</span>
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="reply-content">
          <div className="avatar-textarea-wrapper">
            <img src={authUser.avatar} className="avatar" alt="User avatar" />
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  ref={(e) => {
                    field.ref(e);
                    textareaRef.current = e;
                  }}
                  data-testid="content"
                  className="reply-textarea no-scrollbar"
                  placeholder='Post your reply'
                  onInput={(event) => {
                    handleTextareaChange(event);
                    field.onChange(event);
                  }}
                />
              )}
            />
          </div>
          <button
            type="submit"
            className="reply-button"
            disabled={loading}
          >
            {loading ? 'Loading' : 'Reply'}
          </button>

        </div>
        {errors.content && <span data-testid="content-error" className="error-message">{errors.content.message}</span>}
      </form>
    </div>
  );
};

FormComment.propTypes = {
  id: PropTypes.string.isRequired,
  owner: PropTypes.object.isRequired,
};

export default FormComment;
