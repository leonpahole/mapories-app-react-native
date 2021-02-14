import {useNavigation} from '@react-navigation/native';
import {HeaderBackButton} from '@react-navigation/stack';
import React from 'react';
import {View} from 'react-native';
import {ColorScheme} from '../../styles/colors';

interface BackButtonWithOverlayProps {
  textColor?: string;
  backgroundColor?: string;
  backText?: string;
}

const BackButtonWithOverlay: React.FC<BackButtonWithOverlayProps> = ({
  textColor = ColorScheme.white,
  backgroundColor = '#000000AF',
  backText = 'Back',
}) => {
  const navigation = useNavigation<any>();

  return (
    <View
      style={{
        backgroundColor,
        position: 'absolute',
        zIndex: 1,
        width: '100%',
      }}>
      <HeaderBackButton
        style={{
          paddingVertical: 15,
          paddingHorizontal: 5,
          opacity: 1,
        }}
        pressColorAndroid={ColorScheme.transparent}
        label={backText}
        labelVisible={true}
        labelStyle={{
          fontWeight: 'bold',
        }}
        tintColor={textColor}
        onPress={() => {
          navigation.pop();
        }}
      />
    </View>
  );
};

export {BackButtonWithOverlay};
