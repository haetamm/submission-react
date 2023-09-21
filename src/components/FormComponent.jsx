import React, { useState } from "react";
import PropTypes from 'prop-types';

const FormComponent = ({ addNote }) => {
  const [form, setForm] = useState({ title: '', description: '' });
    const [errors, setErrors] = useState({ title: '', description: '' });
    const [characterCount, setCharacterCount] = useState(0);

    const onTitleChangeHandler = (event) => {
        const titleValue = event.target.value;
        setForm({
            ...form,
            title: titleValue,
        });
        setCharacterCount(titleValue.length);

        if (titleValue.trim() === '' || titleValue.length > 50) {
            setErrors({
                ...errors,
                title: 'Judul harus diisi dan tidak lebih dari 50 karakter',
            });
        } else {
            setErrors({
                ...errors,
                title: '',
            });
        }
    };

    const onDescriptionChangeHandler = (event) => {
        const descriptionValue = event.target.value;
        setForm({
            ...form,
            description: event.target.value,
        });

        if (descriptionValue.trim() === '') {
            setErrors({
                ...errors,
                description: 'Catatan harus diisi dan',
            });
        } else {
            setErrors({
                ...errors,
                description: '',
            });
        }
    };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (form.title.trim() === '' || form.description.trim() === '') {
        setErrors({
            title: 'Judul harus diisi dan tidak lebih dari 50 karakter',
            description: 'Catatan harus diisi'
        });
      return;
    }

    addNote(form);
    setForm({ title: '', description: '' });
    setCharacterCount(0);

  };

  return (
    <div className="form-component">
        <div className="wrap">
            <div className='form-title'>Form Catatan</div>
            <form onSubmit={onSubmitHandler} className="form-note">
                <input
                    onChange={onTitleChangeHandler}
                    value={form.title}
                    type="text"
                    placeholder='Tulis judul disini..'
                    className='input-title'
                />
                <div className="wrap-error">
                    <small className="error flex-1">{errors.title}</small>
                    <small className="error">{characterCount}/50</small>
                </div>
                <textarea
                    onChange={onDescriptionChangeHandler}
                    value={form.description}
                    className='input-body'
                    name="body"
                    cols="30"
                    rows="5"
                    placeholder='Tuliskan catatanmu disini...'
                ></textarea>
                {errors.description && <small className="error">{errors.description}</small>}
                <button type='submit' className='pointer'>Save</button>
            </form>
        </div>
    </div>
  )
}

FormComponent.propTypes = {
  addNote: PropTypes.func.isRequired,
}

export default FormComponent;
