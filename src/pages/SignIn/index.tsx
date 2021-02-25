import React, {
  FC, useCallback, useEffect, useRef,
} from 'react';
import * as api from 'modules/api';
import { Form, Formik, FormikHelpers } from 'formik';
import { object, string } from 'yup';
import { useHistory } from 'react-router-dom';
import { notification } from 'components/Notification';
import { FormField } from 'components/FormField';
import { FormButton } from 'components/FormButton';
import { FormLink } from 'components/FormLink';
import { AppUrls } from 'routes/appUrls';
import { SignInRequest } from 'interfaces';
import { store } from 'store/store';
import { loginRequest } from 'store/auth/thunks';
import { PageMeta } from 'components/PageMeta/PageMeta';
import './SignIn.css';
import { getUserTheme } from 'store/themes/thunks';
import { setThemeStyles } from 'modules/setTheme';
import { useEnhance } from './useEnhance';

const initialValues: SignInRequest = {
  login: '',
  password: '',
};

const validationSchema = object().shape({
  login: string().required('Username is required'),
  password: string().required('Password is required'),
});

// Authorization using Yandex
const loginWithYandex = async (): Promise<void> => {
  try {
    const { serviceId } = await api.getYandexOAuthService();
    const { origin } = window.location;
    window.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${serviceId}&redirect_uri=${origin}/`;
  } catch (err) {
    notification.error('Authorisation Error');
  }
};

export const SignIn: FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const history = useHistory();

  const { isUserLogged, login, signInError } = useEnhance();

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

      store.dispatch(getUserTheme()).then(() => {
        const { theme } = store.getState().themes;

        if (theme) {
          setThemeStyles(theme);
        }
      });
    }
  }, [isUserLogged]);

  return (
    <section className='signin-form-wrapper'>
      <PageMeta title="Sign in" description="Regular player login" />

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

      <fieldset className="signin-fieldset">
        <legend className="signin-fieldset__legend">Log in with</legend>
        <button onClick={loginWithYandex} type="button" className="signin-fieldset__button-yandex" />
      </fieldset>
    </section>
  );
};
