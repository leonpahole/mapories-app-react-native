import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {TextInput, View} from 'react-native';
import {
  withFormikControl,
  withInputTypeProps,
  withNextInputAutoFocusInput,
} from 'react-native-formik';
import {ColorScheme} from '../../styles/colors';
import {StyledTextInput} from '../styled/input/StyledTextInput';
import {InputError} from '../styled/typography/InputError';
import {InputLabel} from '../styled/typography/InputLabel';

export type IMyTextInputProps = {};

const MyTextInput: React.FC<any> = (props, ref) => {
  const {error, value, setFieldValue, touched} = props as any;

  let inputRef = useRef<TextInput>();
  useImperativeHandle(ref, () => ({
    focus: () => {
      if (inputRef && inputRef.current) {
        inputRef!.current!.focus();
      }
    },
  }));

  return (
    <View style={props.containerStyle}>
      <View style={{marginBottom: 5}}>
        <InputLabel>{props.label}</InputLabel>
      </View>
      <StyledTextInput
        placeholderTextColor={ColorScheme.placeholderColor}
        onChangeText={setFieldValue}
        value={value}
        blurOnSubmit={false}
        forwardedRef={inputRef as any}
        {...props}
      />
      {touched && <InputError>{error}</InputError>}
    </View>
  );
};

export default withFormikControl(
  withInputTypeProps(
    withNextInputAutoFocusInput(forwardRef(MyTextInput as any)),
  ),
) as any;
