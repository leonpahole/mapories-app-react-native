import {useSelector} from 'react-redux';
import {RootStore} from '../redux/store';

export const useLoggedInUser = () => {
  const loggedInUser = useSelector(
    (state: RootStore) => state.auth.loggedInUser,
  );

  return loggedInUser;
};
