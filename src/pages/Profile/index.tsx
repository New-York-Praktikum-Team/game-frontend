import React, { FC, useCallback } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { object, ref, string } from 'yup';
import { AppUrls } from 'routes/appUrls';
import { FormField } from 'components/FormField';
import { FormButton } from 'components/FormButton';
import { FormLink } from 'components/FormLink';
import { User } from 'interfaces';
import { store } from 'store/store';
import { fetchUser, fetchUserUpdateRequest } from 'store/user/thunks';
import { useEnhance } from './useEnhance';
import './Profile.css';

interface PasswordFormFields {
  password: string,
  verifyPassword: string
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
  password: string().min(4, 'Must be longer than 4 characters').required('Password is required'),
  verifyPassword: string().equals([ref('password')], 'Passwords must match').required('Verify password is required'),
});

export const Profile: FC = () => {
  const { profile } = useEnhance();

  if (!profile) return null;

  const formFields: User = {
    ...profile,
    displayName: profile.displayName || '',
  };

  const updateProfile = useCallback(async (
    values: User,
    { setSubmitting }: FormikHelpers<User>,
  ) => {
    setSubmitting(true);
    await store.dispatch(fetchUserUpdateRequest(values));
    await store.dispatch(fetchUser);
    setSubmitting(false);
  }, []);

  const changePassword = useCallback(async (
    values: PasswordFormFields,
    { setSubmitting }: FormikHelpers<PasswordFormFields>,
  ) => {
    setSubmitting(true);
    setSubmitting(false);
  }, []);

  return (
    <section className='profile-form-wrapper'>
      <h1>Profile</h1>

      <div className="row">
        <div className="col s4">
          <fieldset>
            <legend>Personal data</legend>
            <Formik
              initialValues={formFields}
              validationSchema={validationSchema}
              validateOnChange={false}
              validateOnBlur={true}
              onSubmit={updateProfile}
            >
              {({ isSubmitting }) => (
                <Form>
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
          <fieldset>
            <legend>Avatar</legend>
            <div className='avatar-wrapper'>
              <div className='avatar' style={{ backgroundImage: profile.avatar ? `url(${profile.avatar})` : undefined }}>
                <label htmlFor="input-avatar" className='change-avatar'>Change</label>
                <input
                  style={{ display: 'none' }}
                  id='input-avatar'
                  type='file'
                  name='avatar'
                  accept='image/*'
                  onChange={
                    // eslint-disable-next-line no-console
                    (e) => { console.log('Changing avatar to ', e.target.value); }
                  }
                />
              </div>
            </div>
          </fieldset>
        </div>

        <div className="col s4">
          <fieldset>
            <legend>Change password</legend>
            <Formik
              initialValues={{ password: '', verifyPassword: '' }}
              validationSchema={validationPasswordSchema}
              validateOnChange={false}
              validateOnBlur={true}
              onSubmit={changePassword}
            >
              {({ isSubmitting }) => (
                <Form>
                  <FormField type='password' label='Password' name='password' />
                  <FormField type='password' label='Verify Password' name='verifyPassword' />
                  <FormButton text='Save' disabled={isSubmitting} />
                </Form>
              )}
            </Formik>
          </fieldset>
        </div>
      </div>
    </section>
  );
};
