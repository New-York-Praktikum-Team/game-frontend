import React, {
  FC, useCallback, useEffect, useRef,
} from 'react';
import {
  Field, Form, Formik, FormikHelpers,
} from 'formik';
import { object, string } from 'yup';
import { AppUrls } from 'routes/appUrls';
import { FormField } from 'components/FormField';
import { FormButton } from 'components/FormButton';
import { FormLink } from 'components/FormLink';
import { User } from 'interfaces';
import { store } from 'store/store';
import {
  changeUserAvatar, changeUserPassword, updateUserProfile, userLogout,
} from 'store/user/thunks';
import { PageMeta } from 'components/PageMeta/PageMeta';
import { fetchThemes, setUserTheme } from 'store/themes/thunks';
import { setThemeStyles } from 'modules/setTheme';
import { useEnhance } from './useEnhance';
import './Profile.css';

interface PasswordFormFields {
  oldPassword: string,
  newPassword: string
}

interface Theme {
  theme: string
}

const validationSchema = object().shape({
  email: string().email('Invalid email address').required('Email is required'),
  login: string().min(4, 'Username must be longer than 4 characters').required('Username is required'),
  firstName: string().required('First name is required'),
  secondName: string().required('Last name is required'),
  displayName: string().required('Display name is required'),
  phone: string().matches(/^[\d -]+$/g, 'Phone should contain only numbers and dashes').required('Phone is required'),
});

const validationPasswordSchema = object().shape({
  oldPassword: string().min(4, 'Must be longer than 4 characters').required('Password is required'),
  newPassword: string().min(4, 'Must be longer than 4 characters').required('Password is required'),
});

export const Profile: FC = () => {
  const profileFormRef = useRef<HTMLFormElement>(null);
  const passwordFormRef = useRef<HTMLFormElement>(null);

  const {
    profile, backgroundImage, themes, theme,
  } = useEnhance();

  useEffect(() => {
    store.dispatch(fetchThemes);
  }, []);

  if (!profile) return null;

  const formFields: User = {
    ...profile,
    displayName: profile.displayName || '',
    phone: profile.phone || '',
  };

  const updateProfile = useCallback(async (
    values: User,
    { setSubmitting }: FormikHelpers<User>,
  ) => {
    setSubmitting(true);
    await store.dispatch(updateUserProfile(values));
    setSubmitting(false);
  }, [profileFormRef]);

  const changePassword = useCallback(async (
    { oldPassword, newPassword }: PasswordFormFields,
    { setSubmitting }: FormikHelpers<PasswordFormFields>,
  ) => {
    setSubmitting(true);
    await store.dispatch(changeUserPassword(oldPassword, newPassword));
    setSubmitting(false);
  }, [passwordFormRef]);

  const updateAvatar = useCallback(async (event: React.SyntheticEvent<HTMLInputElement>) => {
    const element = event.target as HTMLInputElement;

    if (element && element.files && element.files[0]) {
      await store.dispatch(changeUserAvatar(element.files[0]));
    }
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    await store.dispatch(userLogout);
  }, []);

  const changeTheme = useCallback(async (
    values: Theme,
    { setSubmitting }: FormikHelpers<Theme>,
  ) => {
    setSubmitting(true);
    await store.dispatch(setUserTheme(Number(values.theme)));
    setThemeStyles();
    setSubmitting(false);
  }, [profileFormRef]);

  return (
    <section className='profile-form-wrapper'>
      <PageMeta title="Profile" description="Player profile" />

      <h1>Profile</h1>

      <div className="row">
        <div className="col s4">
          <fieldset className="profile-fieldset">
            <legend>Personal data</legend>
            <Formik
              initialValues={formFields}
              validationSchema={validationSchema}
              validateOnChange={false}
              validateOnBlur={true}
              onSubmit={updateProfile}
            >
              {({ isSubmitting }) => (
                <Form ref={profileFormRef}>
                  <FormField type='email' label='Email' name='email' />
                  <FormField label='Username' name='login' />
                  <FormField label='First Name' name='firstName' />
                  <FormField label='Last Name' name='secondName' />
                  <FormField label='Display Name' name='displayName' />
                  <FormField label='Phone Number' name='phone' />

                  <FormButton text='Save' disabled={isSubmitting} />
                  <FormLink text='Back to game' to={AppUrls.Game} />
                </Form>
              )}
            </Formik>

          </fieldset>
        </div>

        <div className="col s4">
          <fieldset className="profile-fieldset">
            <legend>Avatar</legend>
            <div className='avatar-wrapper'>
              <div className='avatar' style={{ backgroundImage }}>
                <label htmlFor="input-avatar" className='change-avatar'>Change</label>
                <input
                  style={{ display: 'none' }}
                  id='input-avatar'
                  type='file'
                  name='avatar'
                  accept='image/*'
                  onChange={updateAvatar}
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="profile-fieldset">
            <legend>Change password</legend>
            <Formik
              initialValues={{ oldPassword: '', newPassword: '' }}
              validationSchema={validationPasswordSchema}
              validateOnChange={false}
              validateOnBlur={true}
              onSubmit={changePassword}
            >
              {({ isSubmitting }) => (
                <Form ref={passwordFormRef}>
                  <FormField type='password' label='Old password' name='oldPassword' />
                  <FormField type='password' label='New Password' name='newPassword' />
                  <FormButton text='Save' disabled={isSubmitting} />
                </Form>
              )}
            </Formik>
          </fieldset>
        </div>
        <div className="col s4">
          <fieldset className="profile-fieldset">
            <legend>Theme</legend>
            <Formik
              initialValues={{ theme: theme ? theme.id.toString() : '1' }}
              onSubmit={changeTheme}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field as="select" name="theme">
                    {themes.map(({ name, id }) => (
                      <option key={id} value={id}>{name}</option>
                    ))}
                  </Field>
                  <hr/>
                  <FormButton text='Save' disabled={isSubmitting} />
                </Form>
              )}
            </Formik>
          </fieldset>
          <fieldset className="profile-fieldset">
            <legend>Exit</legend>
            <div>
              <span>To exit the profile, use the button below</span>
            </div>
            <hr/>
            <button className="btn" onClick={logout}>Logout</button>
          </fieldset>
        </div>
      </div>
    </section>
  );
};
