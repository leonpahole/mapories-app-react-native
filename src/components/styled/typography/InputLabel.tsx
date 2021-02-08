import React from 'react';
import {Text} from 'react-native';
import {ColorScheme} from '../../../styles/colors';

const InputLabel: React.FC = ({children}) => {
  if (!children) {
    return null;
  }

  return (
    <Text
      style={{
        color: ColorScheme.gray,
      }}>
      {children}
    </Text>
  );
};

export {InputLabel};
