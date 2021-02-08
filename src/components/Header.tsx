import React from 'react';
import {Image, Text, View} from 'react-native';
import {ColorScheme} from '../styles/colors';
import {useLoggedInUser} from '../hooks/useLoggedInUser';

const Header: React.FC = ({}) => {
  const loggedInUser = useLoggedInUser();

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: ColorScheme.white,
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          style={{height: 30, width: 30, marginRight: 10}}
          source={require('../assets/map.png')}
        />
        <Text
          style={{fontSize: 25, color: ColorScheme.gray, fontWeight: 'bold'}}>
          Mapories
        </Text>
      </View>

      <Text style={{color: ColorScheme.gray}}>{loggedInUser?.name}</Text>
    </View>
  );
};

export {Header};
