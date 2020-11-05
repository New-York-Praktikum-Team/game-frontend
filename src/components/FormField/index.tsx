import './FormField.css';

import React from 'react';
import { Field, ErrorMessage, connect } from 'formik';

type FormFieldProps = {
  name: string,
  label: string
};

type OtherFormFieldProps = Record<string, any>;

export const FormField = connect((props: FormFieldProps & OtherFormFieldProps) => {
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
        className='helper-text error'
        component='span'
        name={name}
      />
    </div>
  );
});
