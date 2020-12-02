import React, { FC, useCallback } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { object, string } from 'yup';
import { AppUrls } from 'routes/appUrls';
import { FormField } from 'components/FormField';
import { FormButton } from 'components/FormButton';
import { FormLink } from 'components/FormLink';
import { User } from 'interfaces';
import './Profile.css';
import { store } from 'store/store';
import { fetchUser, userUpdateRequest } from 'store/user/thunks';
import { useEnhance } from './useEnhance';

const validationSchema = object().shape({
  email: string().email('Invalid email address').required('Email is required'),
  login: string().min(4, 'Username must be longer than 4 characters').required('Username is required'),
  firstName: string().required('First name is required'),
  secondName: string().required('Last name is required'),
  displayName: string().required('Display name is required'),
  phone: string().matches(/^[\d -]+$/g, 'Phone should contain only numbers and dashes').required('Phone is required'),
});

export const Profile: FC = () => {
  const { profile } = useEnhance();

  if (!profile) return null;

  const formFields: User = {
    ...profile,
    displayName: profile.displayName || '',
  };

  const send = useCallback(async (
    values: User,
    { setSubmitting }: FormikHelpers<User>,
  ) => {
    setSubmitting(true);
    await store.dispatch(userUpdateRequest(values));
    await store.dispatch(fetchUser);
    setSubmitting(false);
  }, []);

  return (
    <section className='profile-form-wrapper'>
      <h1>Hi, {profile.displayName || profile.login}!</h1>

      <Formik
        initialValues={formFields}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={true}
        onSubmit={send}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className='avatar-wrapper'>
                <div className='avatar' style={{
                  backgroundImage: `url(${profile.avatar})`, backgroundSize: 'contain',
                }}>
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
    </section>
  );
};
