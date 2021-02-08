import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';

export type IFeedProps = {};
import {PostsList} from '../components/posts/PostsList';
import {ProfileView} from '../components/user/ProfileView';
import {Post} from '../model/Post';
import {RootNavigatorScreens} from '../navigation/RootNavigator';
import {SideStackNavigatorScreens} from '../navigation/SideStackNavigator';

const Feed: React.FC<IFeedProps> = ({}) => {
  return (
    <View
      style={{
        padding: 10,
        paddingHorizontal: 20,
      }}>
      <PostsList type={'feed'} screenLocation={'main'} />
    </View>
  );
};

export {Feed};
