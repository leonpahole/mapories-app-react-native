import {useSelector} from 'react-redux';
import {RootStore} from '../redux/store';

export const useLoggedInUser = () => {
  const loggedInUser = useSelector(
    (state: RootStore) => state.auth.loggedInUser,
  );

  return loggedInUser;
};

export const useAccessToken = () => {
  const accessToken = useSelector((state: RootStore) => state.auth.accessToken);

  return accessToken;
};
