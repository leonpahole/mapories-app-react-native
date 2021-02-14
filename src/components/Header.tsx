import React from 'react';
import {Image, Text, View} from 'react-native';
import {ColorScheme} from '../styles/colors';
import {useLoggedInUser} from '../hooks/useLoggedInUser';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Logo} from './Logo';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({title}) => {
  const navigation = useNavigation<any>();

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
      <Logo title={title} />

      <TouchableOpacity
        style={{marginRight: 10}}
        onPress={() => {
          navigation.toggleDrawer();
        }}>
        <Icon name="bars" size={25} color={ColorScheme.gray} />
      </TouchableOpacity>
    </View>
  );
};

export {Header};
