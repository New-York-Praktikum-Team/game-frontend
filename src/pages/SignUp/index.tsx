import React, {
  FC, useCallback, useEffect, useRef,
} from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { object, ref, string } from 'yup';
import { useHistory } from 'react-router-dom';
import { notification } from 'components/Notification';
import { SignUpRequest } from 'interfaces';
import { AppUrls } from 'routes/appUrls';
import { FormField } from 'components/FormField';
import { FormButton } from 'components/FormButton';
import { FormLink } from 'components/FormLink';
import { store } from 'store/store';
import { signUpRequest } from 'store/auth/thunks';
import { PageMeta } from 'components/PageMeta/PageMeta';
import { useEnhance } from './useEnhance';
import './SignUp.css';

const initialValues: SignUpRequest = {
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

export const SignUp: FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const history = useHistory();

  const {
    isUserLogged, login, isSuccessfullyRegistered, signUpError,
  } = useEnhance();

  const send = useCallback(async (
    values: SignUpRequest,
    { setSubmitting }: FormikHelpers<SignUpRequest>,
  ) => {
    setSubmitting(true);

    store.dispatch(signUpRequest(values));

    setSubmitting(false);
  }, [formRef]);

  // if we got an error, show it
  useEffect(() => {
    if (signUpError) {
      notification.error(signUpError.message);
    }
  }, [signUpError]);

  // if successfully registered
  useEffect(() => {
    if (isSuccessfullyRegistered) {
      notification.success('You are successfully registered.');

      if (isUserLogged) {
        notification.success(`You are logged in as ${login}`);
        history.push(AppUrls.Game);
      }

      history.push(AppUrls.SignIn);
    }
  }, [isUserLogged, isSuccessfullyRegistered]);

  return (
    <section className='signup-form-wrapper'>
      <PageMeta title="Sign up" description="New player registration" />

      <h1>Create account</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={true}
        onSubmit={send}
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
};
