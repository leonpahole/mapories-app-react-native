import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import {ColorScheme} from '../../styles/colors';

type ButtonProps = TouchableOpacity['props'] & {
  containerStyle?: StyleProp<ViewStyle>;
  loading?: boolean;
};

type GeneralButtonProps = ButtonProps & {
  textColor?: string;
  backgroundColor?: string;
};

export const GeneralButton: React.FC<GeneralButtonProps> = ({
  children,
  containerStyle,
  textColor = ColorScheme.black,
  backgroundColor = ColorScheme.transparent,
  ...props
}) => {
  return (
    <View style={containerStyle}>
      <TouchableOpacity
        {...props}
        style={[
          {
            backgroundColor: props.disabled
              ? ColorScheme.disabled
              : backgroundColor,
            padding: 12,
            alignItems: 'center',
            borderRadius: 5,
          },
          props.style,
        ]}>
        {props.loading ? (
          <ActivityIndicator size="small" color={textColor} />
        ) : (
          <Text
            style={{
              color: textColor,
              fontWeight: 'bold',
              fontSize: 15,
            }}>
            {children}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export const PrimaryButton: React.FC<ButtonProps> = ({children, ...props}) => {
  return (
    <GeneralButton
      textColor={ColorScheme.white}
      backgroundColor={ColorScheme.primary}
      {...props}>
      {children}
    </GeneralButton>
  );
};

export const EmptyButton: React.FC<GeneralButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <GeneralButton
      textColor={ColorScheme.black}
      backgroundColor={ColorScheme.transparent}
      {...props}>
      {children}
    </GeneralButton>
  );
};

export const RoundedButton: React.FC<GeneralButtonProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: props.backgroundColor,
          padding: 5,
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
          width: 50,
          height: 50,
        },
        style,
      ]}
      {...props}>
      {props.loading ? (
        <ActivityIndicator size="small" color={ColorScheme.white} />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};
