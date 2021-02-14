import React from 'react';
import {Image, Text, View} from 'react-native';
import {ColorScheme} from '../styles/colors';

interface LogoProps {
  title?: string;
}

const Logo: React.FC<LogoProps> = ({title}) => {
  return (
    <View>
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
          {title || 'Mapories'}
        </Text>
      </View>
    </View>
  );
};

export {Logo};
