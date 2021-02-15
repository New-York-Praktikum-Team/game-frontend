import React, {
  FC, useCallback, useEffect, useRef,
} from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppUrls } from 'routes/appUrls';
import { loggedSelector } from 'store/user/selectors';
import { PageMeta } from 'components/PageMeta/PageMeta';
import './Home.css';
import { store } from 'store/store';
import { addFeedback, fetchFeedback } from 'store/feedback/thunks';
import { Feedback } from 'interfaces';
import { feedbackListSelector } from 'store/feedback/selectors';
import { Form, Formik, FormikHelpers } from 'formik';
import { FormButton } from 'components/FormButton';
import { object, string } from 'yup';
import { FormTextArea } from 'components/FormTextArea';

interface FeedbackFormFields {
  review: string
}

const validationSchema = object().shape({
  review: string().required('Text should not be empty'),
});

export const Home: FC = () => {
  const feedbackFormRef = useRef<HTMLFormElement>(null);

  const isLoggedIn = useSelector(loggedSelector);

  const feedbackList: Feedback[] = useSelector(feedbackListSelector);

  useEffect(() => {
    store.dispatch(fetchFeedback);
  }, []);

  const submitFeedback = useCallback(async (
    { review }: FeedbackFormFields,
    { setSubmitting, resetForm }: FormikHelpers<FeedbackFormFields>,
  ) => {
    setSubmitting(true);
    await store.dispatch(addFeedback(review));
    await store.dispatch(fetchFeedback);
    setSubmitting(false);
    resetForm();
  }, [feedbackFormRef]);

  return (
    <section className="home">
      <PageMeta title="Numa Game" description="A fun and mischievous game" />

      <h1>Hello Nyma!</h1>
      <p>Our game is really awesome, you should definitely check it out!</p>
      {isLoggedIn
        ? <p><Link to={AppUrls.Game}>PLAY NOW</Link></p>
        : <p>But first things first, <Link to={AppUrls.SignIn}>Sign In</Link></p>
      }

      <h3>Player reviews</h3>

      <Formik
        initialValues={{ review: '' }}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={submitFeedback}
      >
        {({ isSubmitting }) => (
          <Form ref={feedbackFormRef}>
            <FormTextArea label="Leave your review:" name="review" rows={5} cols={75}></FormTextArea>
            <FormButton text='Send' disabled={isSubmitting} />
          </Form>
        )}
      </Formik>

      {feedbackList.length
        ? feedbackList.map(({ text, user }, index) => (
          <p key={index}>
            <span>{user}: </span>
            <cite>{text}</cite>
          </p>
        ))
        : (
          <p>We want to hear from you, leave your feedback!</p>
        )
      }

    </section>
  );
};
