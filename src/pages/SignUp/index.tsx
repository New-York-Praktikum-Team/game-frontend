import React, { FC } from 'react';
import { Form, Formik } from 'formik';
import { object, ref, string } from 'yup';
import { AppUrls } from 'routes/appUrls';
import { FormField } from 'components/FormField';
import { FormButton } from 'components/FormButton';
import { FormLink } from 'components/FormLink';
import './SignUp.css';

interface SignUpFormValues {
  email: string;
  login: string;
  firstName: string;
  secondName: string;
  phone: string;
  password: string;
  verifyPassword: string;
}

const initialValues: SignUpFormValues = {
  email: '',
  login: '',
  firstName: '',
  secondName: '',
  phone: '',
  password: '',
  verifyPassword: '',
};

const validationSchema = object().shape({
  email: string().email('Invalid email address').required('Email is required'),
  login: string().min(4, 'Username must be longer than 4 characters').required('Username is required'),
  firstName: string().required('First name is required'),
  secondName: string().required('Last name is required'),
  phone: string().matches(/^[\d -]+$/g, 'Phone should contain only numbers and dashes').required('Phone is required'),
  password: string().min(4, 'Must be longer than 4 characters').required('Password is required'),
  verifyPassword: string().equals([ref('password')], 'Passwords must match').required('Verify password is required'),
});

export const SignUp: FC = () => (
  <section className='signup-form-wrapper'>
    <h1>Create account</h1>

    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={true}
      onSubmit={(values: SignUpFormValues, { setSubmitting }) => {
        setTimeout(() => {
          // eslint-disable-next-line no-console
          console.log('Signing up, values = ', values);
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <FormField type='email' label='Email' name='email' />
          <FormField label='Username' name='login' />
          <FormField label='First Name' name='firstName' />
          <FormField label='Last Name' name='secondName' />
          <FormField label='Phone Number' name='phone' />
          <FormField type='password' label='Password' name='password' />
          <FormField type='password' label='Verify Password' name='verifyPassword' />

          <FormButton text='Save' disabled={isSubmitting} />
          <FormLink text='Already have an account? Log In' to={AppUrls.SignIn} />

        </Form>
      )}
    </Formik>
  </section>
);
