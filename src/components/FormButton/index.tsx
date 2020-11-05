import './FormButton.css';

import React from 'react';

type FormButtonProps = {
  text: string
};

type OtherFormButtonProps = Record<string, any>;

export const FormButton = (props: FormButtonProps & OtherFormButtonProps) => {
  const { text, ...rest } = props;
  return (
    <button className='waves-effect waves-light btn' type='submit' {...rest}>
      {text}
    </button>
  );
};
