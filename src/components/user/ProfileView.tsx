import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {onLogout} from '../../api/auth.api';
import {getMyProfile, getUserProfile} from '../../api/user.api';
import {useLoggedInUser} from '../../hooks/useLoggedInUser';
import {ScreenLocation} from '../../model/ScreenLocation';
import {FriendStatus, UserProfile} from '../../model/UserExcerpt';
import {Spinner} from '../common/Spinner';
import {PostsList} from '../posts/PostsList';
import {SubtitleText} from '../styled/typography/SubtitleText';
import {ProfileUserDisplayHeader} from './ProfileUserDisplayHeader';

export type IProfileViewProps = {
  userId?: string;
  screenLocation: ScreenLocation;
};

const ProfileView: React.FC<IProfileViewProps> = ({userId, screenLocation}) => {
  const loggedInUser = useLoggedInUser();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const navigation = useNavigation();

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      try {
        let profile: UserProfile | null = null;
        if (userId && loggedInUser?.id !== userId) {
          profile = await getUserProfile(userId);
        } else {
          profile = await getMyProfile();
        }

        navigation.setOptions({title: profile?.name});
        setProfile(profile);
      } catch (e) {
        console.log('Profile error');
        console.log(e);
      }

      setLoading(false);
    }

    fetchProfile();
  }, [userId, loggedInUser]);

  const onChangeFriendStatus = (status: FriendStatus) => {
    if (!profile) {
      return;
    }

    setProfile({...profile, friendStatus: status});
  };

  let content = null;

  if (loading) {
    content = (
      <View>
        <Spinner loading={loading} />
      </View>
    );
  } else if (!profile) {
    content = (
      <View>
        <SubtitleText>User could not be found at this moment.</SubtitleText>
      </View>
    );
  } else {
    content = (
      <View>
        <PostsList
          type="user"
          headerTopComponent={
            <ProfileUserDisplayHeader
              user={profile}
              onChangeFriendStatus={onChangeFriendStatus}
            />
          }
          screenLocation={screenLocation}
          userId={userId}
          friendStatus={profile.friendStatus}
        />
      </View>
    );
  }

  return <View>{content}</View>;
};

export {ProfileView};
