import { Dispatch } from 'react';
import { BaseActionType } from 'store/types';
import * as api from 'modules/api';
import {
  AddFeedbackActionType,
  FeedbackActionType,
  FeedbackActions,
  addFeedbackError,
  addFeedbackRequest,
  addFeedbackSuccess,
  fetchFeedbackError,
  fetchFeedbackRequest,
  fetchFeedbackSuccess,
} from 'store/feedback/actions';
import { getErrorFromRequest } from 'modules/getErrorFromRequest';
import { notification } from 'components/Notification';

export async function fetchFeedback(
  dispatch: Dispatch<FeedbackActionType | BaseActionType<FeedbackActions>>,
) {
  try {
    dispatch(fetchFeedbackRequest());
    const feedbackList = await api.getFeedback();
    dispatch(fetchFeedbackSuccess(feedbackList));
  } catch (err) {
    dispatch(fetchFeedbackError());
  }
}

export const addFeedback = (text: string) => (
  async (dispatch: Dispatch<AddFeedbackActionType | BaseActionType<FeedbackActions>>) => {
    try {
      dispatch(addFeedbackRequest());
      const feedback = await api.addFeedback(text);
      dispatch(addFeedbackSuccess(feedback));
    } catch (err) {
      dispatch(addFeedbackError());
      // eslint-disable-next-line no-console
      console.error(err);

      const error = await getErrorFromRequest(err);
      notification.error(error.message);
    }
  }
);
