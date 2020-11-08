import './FormField.css';

import React, { InputHTMLAttributes } from 'react';
import {
  Field, ErrorMessage, connect, FormikContextType, FormikValues,
} from 'formik';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string,
  label: string,
}

export const FormField = connect<FormFieldProps, FormikValues>(
  (props: FormFieldProps & { formik: FormikContextType<FormikValues> }) => {
    const {
      label, name, formik, ...rest
    } = props;

    const value = formik.values[name];

    return (
      <div className='input-field'>
        <Field
          name={name}
          id={name}
          onFocus={() => {
            formik.setFieldError({ name }.name, '');
          }}
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
  },
);
