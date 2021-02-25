import { useSelector } from 'react-redux';
import { Feedback } from 'interfaces';
import { feedbackListSelector } from 'store/feedback/selectors';

export const useEnhance = () => {
  const feedbackList: Feedback[] = useSelector(feedbackListSelector);

  return { feedbackList };
};
