import React, { InputHTMLAttributes, useCallback } from 'react';
import {
  ErrorMessage, Field, FormikContextType, FormikValues, connect,
} from 'formik';
import './FormField.css';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

interface ConnectedFormFieldProps extends FormFieldProps {
  formik: FormikContextType<FormikValues>
}

const FormFieldComponent = (props: ConnectedFormFieldProps) => {
  const {
    label, name, type = 'text', formik, ...rest
  } = props;

  const value = formik.values[name];

  const onFocusHandler = useCallback(() => {
    formik.setFieldError(name, '');
  }, [formik, name]);

  return (
    <div className='input-field'>
      <Field
        name={name}
        type={type}
        id={name}
        onFocus={onFocusHandler}
        {...rest}
      />

      <label className={value ? 'active' : ''} htmlFor={name}>{label}</label>
      <ErrorMessage
        className='helper-text materialize-red-text'
        component='span'
        name={name}
      />
    </div>
  );
};

export const FormField = connect<FormFieldProps, FormikValues>(FormFieldComponent);
