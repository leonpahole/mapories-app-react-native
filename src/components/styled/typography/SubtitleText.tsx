import React from 'react';
import {Text} from 'react-native';
import {ColorScheme} from '../../../styles/colors';

export const SubtitleText: React.FC = ({children}) => {
  return (
    <Text
      style={{
        fontSize: 20,
        textAlign: 'center',
        color: ColorScheme.gray,
      }}>
      {children}
    </Text>
  );
};
