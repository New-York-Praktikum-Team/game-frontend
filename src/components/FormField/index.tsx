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
  return (
    <div className='form-field'>
      <label className='form-field-label' htmlFor={name}>{label}</label>
      <Field
        className='form-field-input'
        name={name}
        onFocus={() => {
          formik.setFieldError({ name }.name, '');
        }}
        {...rest}
      />
      <ErrorMessage
        className='form-field-error'
        component='div'
        name={name}
      />
    </div>
  );
});
