import './FormButton.css';

import React from 'react';
import { connect } from 'formik';

type FormButtonProps = {
  text: string
};

type OtherFormButtonProps = Record<string, any>;

export const FormButton = connect((props: FormButtonProps & OtherFormButtonProps) => {
  const { text, ...rest } = props;
  return (
        <button className='form-button' type='submit' {...rest}>
            {text}
        </button>
  );
});
