import { RootState } from 'store/rootReducer';
import { createSelector } from 'reselect';

export const feedbackListSelector = createSelector(
  (state: RootState) => state.feedback.feedbackList,
  (feedbackList) => feedbackList,
);

export const feedbackIsLoading = createSelector(
  (state: RootState) => state.feedback.isLoading,
  (isLoading) => isLoading,
);
