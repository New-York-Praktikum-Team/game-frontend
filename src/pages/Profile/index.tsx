import './Profile.css';

import React, { FC } from 'react';
import { Formik, Form } from 'formik';
import { object, string } from 'yup';
import { AppUrls } from '../../routes/appUrls';
import { FormField } from '../../components/FormField';
import { FormButton } from '../../components/FormButton';
import { FormLink } from '../../components/FormLink';

interface ProfileFormValues {
  email: string;
  login: string;
  firstName: string;
  secondName: string;
  displayName: string;
  phone: string;
  avatar: string;
}

export const Profile: FC = () => {
  const initialValues: ProfileFormValues = {
    email: 'email@test.com',
    login: 'VasyaCool',
    firstName: 'Vasiliy',
    secondName: 'Pupkin',
    displayName: 'Vasya Pupkin',
    phone: '256-348-2468',
    avatar: 'http://placekitten.com/300/300',
  };

  const validationSchema = object().shape({
    email: string().email('Invalid email address').required('Email is required'),
    login: string().min(4, 'Username must be longer than 4 characters').required('Username is required'),
    firstName: string().required('First name is required'),
    secondName: string().required('Last name is required'),
    displayName: string().required('Display name is required'),
    phone: string().matches(/^[\d -]+$/g, 'Phone should contain only numbers and dashes').required('Phone is required'),
  });

  return (
    <div className='profile-form-wrapper'>
      <h1>Hi, {initialValues.displayName}!</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={true}
        onSubmit={(values: ProfileFormValues, { setSubmitting }) => {
          setTimeout(() => {
            /* eslint-disable no-console */
            console.log('Changing profile info, values = ', values);
            /* eslint-enable */
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className='avatar-wrapper'>
              <div className='avatar' style={{
                backgroundImage: `url(${initialValues.avatar})`, backgroundSize: 'contain',
              }}>
                <label htmlFor="input-avatar" className='change-avatar'>Change</label>
                <input
                  style={{ display: 'none' }}
                  id='input-avatar'
                  type='file'
                  name='avatar'
                  accept='image/*'
                  onChange={
                    /* eslint-disable no-console */
                    (e) => { console.log('Changing avatar to ', e.target.value); }
                    /* eslint-enable */
                  }
                />
              </div>
            </div>

            <FormField type='email' label='Email' name='email' />
            <FormField type='text' label='Username' name='login' />
            <FormField type='text' label='First Name' name='firstName' />
            <FormField type='text' label='Last Name' name='secondName' />
            <FormField type='text' label='Display Name' name='displayName' />
            <FormField type='text' label='Phone Number' name='phone' />

            <FormButton text='Save' disabled={isSubmitting} />
            <FormLink text='Back to game' to={AppUrls.Game} />

          </Form>
        )}
      </Formik>
    </div>
  );
};
