import React, { useCallback, useEffect, useRef } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { object, string } from 'yup';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { notification } from 'components/Notification';
import { FormField } from 'components/FormField';
import { FormButton } from 'components/FormButton';
import { FormLink } from 'components/FormLink';
import { AppUrls } from 'routes/appUrls';
import { SignInRequest } from 'interfaces';
import { store } from 'store/store';
import { loginRequest } from 'store/auth/thunks';
import { authError } from 'store/auth/selectors';
import { isLogged, userLogin } from 'store/user/selectors';
import './SignIn.css';

const initialValues: SignInRequest = {
  login: '',
  password: '',
};

const validationSchema = object().shape({
  login: string().required('Username is required'),
  password: string().required('Password is required'),
});

export const SignIn = withRouter(({ history }) => {
  const formRef = useRef<HTMLFormElement>(null);

  // pick values from store
  const isUserLogged = useSelector(isLogged);
  const login = useSelector(userLogin);
  const signInError = useSelector(authError);

  const onSubmitForm = useCallback(async (
    values: SignInRequest,
    { setSubmitting }: FormikHelpers<SignInRequest>,
  ) => {
    setSubmitting(true);

    // async logic packed into thunk
    store.dispatch(loginRequest(values));

    setSubmitting(false);
  }, [formRef]);

  // if we got an error, show it
  useEffect(() => {
    if (signInError) {
      notification.error(signInError.message);
    }
  }, [signInError]);

  // if successfully logged, show login and redirect to game
  useEffect(() => {
    if (isUserLogged) {
      notification.success(`You are logged in as ${login}`);
      history.push(AppUrls.Game);
    }
  }, [isUserLogged]);

  return (
    <section className='signin-form-wrapper'>
      <h1>Log in</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={true}
        onSubmit={onSubmitForm}
      >
        {({ isSubmitting }) => (
          <Form ref={formRef}>
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
