import React from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { object, string } from 'yup';
import { withRouter } from 'react-router-dom';
import { baseApi } from '../../modules/api';
import { notification } from '../../components/Notification';
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

export const SignIn = withRouter(({ history }) => {
  const send = (values: SignInFormValues, { setSubmitting }: FormikHelpers<SignInFormValues>) => {
    setSubmitting(true);

    baseApi.auth.signin(values.login, values.password).then(() => {
      history.push(AppUrls.Leaderboard);
    }).catch(() => {
      notification.error('Incorrect login or password');
    }).finally(() => {
      setSubmitting(false);
    });
  };

  return (
    <section className='signin-form-wrapper'>
      <h1>Log in</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={true}
        onSubmit={send}
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
});
