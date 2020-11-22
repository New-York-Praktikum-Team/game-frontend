import React, { AnchorHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import './FormLink.css';

interface FormLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string;
  to: string;
}

export const FormLink = ({ text, to, ...rest }: FormLinkProps) => (
    <Link className='form-link' to={to} {...rest}>
      {text}
    </Link>
);
