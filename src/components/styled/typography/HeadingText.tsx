import React from 'react';
import {Text} from 'react-native';

export const HeadingText: React.FC = ({children}) => {
  return (
    <Text
      style={{
        fontSize: 40,
        fontWeight: '400',
        textAlign: 'center',
      }}>
      {children}
    </Text>
  );
};
