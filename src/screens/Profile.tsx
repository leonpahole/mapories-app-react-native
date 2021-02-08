import React from 'react';
import {View} from 'react-native';
import {ProfileView} from '../components/user/ProfileView';

export type IProfileProps = {};

const Profile: React.FC<IProfileProps> = ({}) => {
  return (
    <View
      style={{
        padding: 10,
        paddingHorizontal: 20,
      }}>
      <ProfileView screenLocation={'main'} />
    </View>
  );
};

export {Profile};
