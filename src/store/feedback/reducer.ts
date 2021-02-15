import { Feedback } from 'interfaces';
import { BaseActionType } from 'store/types';
import {
  FeedbackActionType, FeedbackActions,
} from 'store/feedback/actions';

type FeedbackReducer = {
  feedbackList: Feedback[];
  isLoading: boolean;
};

const defaultReducer: FeedbackReducer = {
  feedbackList: [],
  isLoading: true,
};

export function feedbackReducer(
  state: FeedbackReducer = defaultReducer,
  action: BaseActionType<FeedbackActions> | FeedbackActionType,
): FeedbackReducer {
  switch (action.type) {
    case FeedbackActions.FETCH_FEEDBACK_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FeedbackActions.FETCH_FEEDBACK_SUCCESS:
      return {
        ...state,
        feedbackList: (action as FeedbackActionType).feedbackList,
        isLoading: false,
      };
    case FeedbackActions.FETCH_FEEDBACK_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
