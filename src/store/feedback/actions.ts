import { Feedback } from 'interfaces';
import { BaseActionType } from '../types';

export enum FeedbackActions {
  FETCH_FEEDBACK_REQUEST = '@@feedback/FETCH_FEEDBACK_REQUEST',
  FETCH_FEEDBACK_SUCCESS = '@@feedback/FETCH_FEEDBACK_SUCCESS',
  FETCH_FEEDBACK_ERROR = '@@feedback/FETCH_FEEDBACK_ERROR',

  ADD_FEEDBACK_REQUEST = '@@feedback/ADD_FEEDBACK_REQUEST',
  ADD_FEEDBACK_SUCCESS = '@@feedback/ADD_FEEDBACK_SUCCESS',
  ADD_FEEDBACK_ERROR = '@@feedback/ADD_FEEDBACK_ERROR',
}

export interface FeedbackActionType extends BaseActionType<FeedbackActions> {
  feedbackList: Feedback[];
}

export interface AddFeedbackActionType extends BaseActionType<FeedbackActions> {
  feedback: Feedback;
}

export function fetchFeedbackRequest(): BaseActionType<FeedbackActions> {
  return { type: FeedbackActions.FETCH_FEEDBACK_REQUEST };
}

export function fetchFeedbackSuccess(feedbackList: Feedback[]): FeedbackActionType {
  return { type: FeedbackActions.FETCH_FEEDBACK_SUCCESS, feedbackList };
}

export function fetchFeedbackError(): BaseActionType<FeedbackActions> {
  return { type: FeedbackActions.FETCH_FEEDBACK_ERROR };
}

export function addFeedbackRequest(): BaseActionType<FeedbackActions> {
  return { type: FeedbackActions.ADD_FEEDBACK_REQUEST };
}

export function addFeedbackSuccess(feedback: Feedback): AddFeedbackActionType {
  return { type: FeedbackActions.ADD_FEEDBACK_SUCCESS, feedback };
}

export function addFeedbackError(): BaseActionType<FeedbackActions> {
  return { type: FeedbackActions.ADD_FEEDBACK_ERROR };
}
