import React, { ButtonHTMLAttributes } from 'react';
import './FormButton.css';

interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export const FormButton = ({ text, ...rest }: FormButtonProps) => (
    <button className='waves-effect waves-light btn' type='submit' {...rest}>
      {text}
    </button>
);
