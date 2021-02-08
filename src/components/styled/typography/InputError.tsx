import React from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';
import {ColorScheme} from '../../../styles/colors';

const InputError: React.FC<{style?: StyleProp<TextStyle>}> = ({
  style,
  children,
}) => {
  if (!children) {
    return null;
  }

  return <Text style={[{color: ColorScheme.error}, style]}>{children}</Text>;
};

export {InputError};
