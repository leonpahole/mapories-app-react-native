import React from 'react';
import ImageSwiper from '@freakycoder/react-native-image-swiper';
import {useWindowDimensions, View} from 'react-native';
import {HeaderBackButton} from '@react-navigation/stack';
import {ColorScheme} from '../../styles/colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import {BackButtonWithOverlay} from '../../components/common/BackButtonWithOverlay';

export const GalleryScreen: React.FC = ({}) => {
  const dimensions = useWindowDimensions();
  const route = useRoute<any>();

  return (
    <View style={{height: '100%'}}>
      <BackButtonWithOverlay />

      <ImageSwiper
        imageHeight={dimensions.height}
        images={
          route?.params?.imageUris.map((uri: string) => ({
            uri,
          })) || []
        }
      />
    </View>
  );
};
