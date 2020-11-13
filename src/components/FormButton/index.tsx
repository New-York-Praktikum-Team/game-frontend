import React, { ButtonHTMLAttributes } from 'react';
import './FormButton.css';

interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export const FormButton = (props: FormButtonProps) => {
  const { text, ...rest } = props;
  return (
    <button className='waves-effect waves-light btn' type='submit' {...rest}>
      {text}
    </button>
  );
};
