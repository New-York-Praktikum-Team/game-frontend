import React, { FC } from 'react';
import { Form, Formik } from 'formik';
import { object, string } from 'yup';
import { AppUrls } from '../../routes/appUrls';
import { FormField } from '../../components/FormField';
import { FormButton } from '../../components/FormButton';
import { FormLink } from '../../components/FormLink';
import './SignIn.css';

interface SignInFormValues {
  login: string;
  password: string;
}

const initialValues: SignInFormValues = {
  login: '',
  password: '',
};

const validationSchema = object().shape({
  login: string().required('Username is required'),
  password: string().required('Password is required'),
});

export const SignIn: FC = () => (
  <section className='signin-form-wrapper'>
    <h1>Log in</h1>

    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={true}
      onSubmit={(values: SignInFormValues, { setSubmitting }) => {
        setTimeout(() => {
          // eslint-disable-next-line no-console
          console.log('Logging in, values = ', values);
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <FormField label='Username' name='login' />
          <FormField type='password' label='Password' name='password' />

          <FormButton text='Log in' disabled={isSubmitting} />
          <FormLink text='Need an account? Sign Up' to={AppUrls.SignUp} />

        </Form>
      )}
    </Formik>
  </section>
);
