import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {ProfileView} from '../../components/user/ProfileView';
import {SideStackNavigatorParamList} from '../../navigation/SideStackNavigator';
import {ColorScheme} from '../../styles/colors';

type SingleProfileViewNavigationProp = RouteProp<
  SideStackNavigatorParamList,
  'SingleProfileView'
>;

const SingleProfileView: React.FC = ({}) => {
  const route = useRoute<SingleProfileViewNavigationProp>();

  return (
    <View
      style={{
        padding: 10,
        paddingHorizontal: 20,
        backgroundColor: ColorScheme.white,
        height: '100%',
      }}>
      <ProfileView userId={route.params.userId} screenLocation={'side'} />
    </View>
  );
};

export {SingleProfileView};
