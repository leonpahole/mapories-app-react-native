import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {useWindowDimensions, View} from 'react-native';
import {BackButtonWithOverlay} from '../../components/common/BackButtonWithOverlay';
import {Map} from '../../components/map/Map';
import {RootNavigatorParamList} from '../../navigation/RootNavigator';

type MapScreenNavigationProp = RouteProp<RootNavigatorParamList, 'MapScreen'>;

export const MapScreen: React.FC = ({}) => {
  const dimensions = useWindowDimensions();
  const route = useRoute<MapScreenNavigationProp>();

  return (
    <View style={{height: '100%'}}>
      <BackButtonWithOverlay />
      <Map
        center={route.params.center}
        markers={route.params.markers || []}
        style={{height: dimensions.height, width: dimensions.width}}
        zoomEnabled={true}
        scrollEnabled={true}
      />
    </View>
  );
};
