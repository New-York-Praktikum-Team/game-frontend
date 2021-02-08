import React, { TextareaHTMLAttributes, useCallback } from 'react';
import {
  ErrorMessage, Field, FormikContextType, FormikValues, connect,
} from 'formik';
import './FormTextArea.css';

interface FormTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
}

interface ConnectedFormFieldProps extends FormTextAreaProps {
  formik: FormikContextType<FormikValues>
}

const FormTextAreaComponent = (props: ConnectedFormFieldProps) => {
  const {
    label, name, formik, ...rest
  } = props;

  const onFocusHandler = useCallback(() => {
    formik.setFieldError(name, '');
  }, [formik, name]);

  return (
    <div className='input-field'>
      <div className='textarea-label'>{label}</div>
      <Field
        name={name}
        id={name}
        className='textarea'
        onFocus={onFocusHandler}
        component='textarea'
        {...rest}
      />

      <ErrorMessage
        className='helper-text materialize-red-text'
        component='span'
        name={name}
      />
    </div>
  );
};

export const FormTextArea = connect<FormTextAreaProps, FormikValues>(FormTextAreaComponent);
