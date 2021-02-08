import React from 'react';
import {TextInput, View} from 'react-native';
import {ColorScheme} from '../../../styles/colors';
import {PrimaryButton} from '../Buttons';
import Icon from 'react-native-vector-icons/FontAwesome';

const StyledTextInputWithButton: React.FC<
  TextInput['props'] & {forwardedRef?: any; iconName: string; onPress(): void}
> = ({forwardedRef, iconName, onPress, ...props}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <TextInput
        {...props}
        style={[
          {
            borderColor: ColorScheme.gray,
            borderWidth: 1,
            borderRadius: 5,
            paddingLeft: 10,
            flex: 1,
          },
          props.style,
        ]}
        ref={forwardedRef}
      />
      <PrimaryButton style={{marginLeft: 10}} onPress={onPress}>
        <Icon name={iconName} size={25} color={ColorScheme.white} />
      </PrimaryButton>
    </View>
  );
};

export {StyledTextInputWithButton};
