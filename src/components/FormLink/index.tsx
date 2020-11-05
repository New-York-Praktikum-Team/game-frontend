import './FormLink.css';

import React from 'react';
import { Link } from 'react-router-dom';

type FormLinkProps = {
  text: string,
  to: string
};

type OtherFormLinkProps = Record<string, any>;

export const FormLink = (props: FormLinkProps & OtherFormLinkProps) => {
  const { text, to, ...rest } = props;
  return (
    <Link className='form-link' to={to} {...rest}>
      {text}
    </Link>
  );
};
