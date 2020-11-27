import React, { useCallback } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { object, ref, string } from 'yup';
import { withRouter } from 'react-router-dom';
import { getErrorFromRequest } from 'modules/getErrorFromRequest';
import { notification } from 'components/Notification';
import * as api from 'modules/api';
import { SignUpRequest } from 'interfaces';
import { AppUrls } from 'routes/appUrls';
import { FormField } from 'components/FormField';
import { FormButton } from 'components/FormButton';
import { FormLink } from 'components/FormLink';
import { store } from 'store/store';
import { loadSuccess, setUser } from 'store/actions/user';
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

export const SignUp = withRouter(({ history }) => {
  const send = useCallback(async (
    values: SignUpRequest,
    { setSubmitting }: FormikHelpers<SignUpRequest>,
  ) => {
    setSubmitting(true);

    try {
      await api.signUp(values);
      notification.success('You are successfully registered.');

      const user = await api.getUserInfo();

      if (user) {
        store.dispatch(setUser(user));
        store.dispatch(loadSuccess());

        notification.success(`You are logged in as ${user.login}`);
        history.push(AppUrls.Game);
      } else {
        history.push(AppUrls.SignIn);
      }
    } catch (responseError) {
      setSubmitting(false);
      const error = await getErrorFromRequest(responseError);
      notification.error(error.message);
    }
  }, []);

  return (
    <section className='signup-form-wrapper'>
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
});
