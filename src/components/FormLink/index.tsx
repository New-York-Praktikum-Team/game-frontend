import React, { AnchorHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import './FormLink.css';

interface FormLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string;
  to: string;
}

export const FormLink = (props: FormLinkProps) => {
  const { text, to, ...rest } = props;
  return (
    <Link className='form-link' to={to} {...rest}>
      {text}
    </Link>
  );
};
