import React from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {onLogout} from '../../api/auth.api';
import {UserProfile, FriendStatus} from '../../model/UserExcerpt';
import {ColorScheme} from '../../styles/colors';
import {EmptyButton} from '../styled/Buttons';
import {FriendButtons} from './FriendButtons';
import {UserDisplay} from './UserDisplay';

export type IProfileUserDisplayHeaderProps = {
  user: UserProfile;
  onChangeFriendStatus(status: FriendStatus): void;
};

const ProfileUserDisplayHeader: React.FC<IProfileUserDisplayHeaderProps> = ({
  user,
  onChangeFriendStatus,
}) => {
  const dispatch = useDispatch();

  return (
    <View style={{marginBottom: 10}}>
      <UserDisplay userName={user.name} />
      {user.friendStatus === FriendStatus.IS_ME && (
        <EmptyButton
          textColor={ColorScheme.error}
          containerStyle={{alignItems: 'flex-end'}}
          onPress={async () => {
            await onLogout(dispatch);
          }}>
          Logout
        </EmptyButton>
      )}
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <FriendButtons user={user} onChange={onChangeFriendStatus} />
      </View>
    </View>
  );
};

export {ProfileUserDisplayHeader};
