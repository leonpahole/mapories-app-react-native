import React from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';
import {ColorScheme} from '../../../styles/colors';

const SuccessText: React.FC<{style?: StyleProp<TextStyle>}> = ({
  style,
  children,
}) => {
  if (!children) {
    return null;
  }

  return <Text style={[{color: ColorScheme.success}, style]}>{children}</Text>;
};

export {SuccessText};
