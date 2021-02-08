import React from 'react';
import {TextInput} from 'react-native';
import {ColorScheme} from '../../../styles/colors';

const StyledTextInput: React.FC<TextInput['props'] & {forwardedRef?: any}> = ({
  forwardedRef,
  ...props
}) => {
  return (
    <TextInput
      {...props}
      style={[
        {
          borderColor: ColorScheme.gray,
          borderWidth: 1,
          borderRadius: 5,
          paddingLeft: 10,
        },
        props.style,
      ]}
      ref={forwardedRef}
    />
  );
};

export {StyledTextInput};
