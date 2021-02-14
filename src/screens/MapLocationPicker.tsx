import Geolocation from '@react-native-community/geolocation';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {useEffect} from 'react';
import {ToastAndroid, useWindowDimensions, View} from 'react-native';
import {getFeedMapData} from '../api/post.api';
import {BackButtonWithOverlay} from '../components/common/BackButtonWithOverlay';
import {Map} from '../components/map/Map';
import {PrimaryButton} from '../components/styled/Buttons';
import {MapLocation, MaporyMapItem} from '../model/MaporyMapItem';
import {navigationRef} from '../navigation/RootNavigation';
import {
  RootNavigatorParamList,
  RootNavigatorScreens,
} from '../navigation/RootNavigator';
import {SideStackNavigatorScreens} from '../navigation/SideStackNavigator';

type MapLocationPickerNavigationProp = RouteProp<
  RootNavigatorParamList,
  'MapLocationPicker'
>;

const MapLocationPicker: React.FC = () => {
  const dimensions = useWindowDimensions();

  const route = useRoute<MapLocationPickerNavigationProp>();
  const navigation = useNavigation<any>();

  const [location, setLocation] = useState<MapLocation | undefined>(undefined);

  useEffect(() => {
    setLocation(route.params.preselectedLocation);
  }, [route.params.preselectedLocation]);

  const useMyLocation = () => {
    Geolocation.getCurrentPosition((info) =>
      setLocation({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      }),
    );
  };

  return (
    <View style={{height: '100%'}}>
      <BackButtonWithOverlay backText={'Select location on the map'} />
      <Map
        zoom={3}
        center={location ? location : {latitude: 30, longitude: 31}}
        style={{height: dimensions.height, width: dimensions.width}}
        zoomEnabled={true}
        scrollEnabled={true}
        zoomOnPress={true}
        markers={location ? [{...location, id: '1'}] : []}
        onPress={(coord) => {
          if (coord) {
            setLocation(coord);
          }
        }}
      />
      <View
        style={{
          position: 'absolute',
          zIndex: 1,
          width: '100%',
          bottom: 20,
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <PrimaryButton
          style={{flex: 1, display: location ? 'flex' : 'none'}}
          onPress={() => {
            if (route.params.onSelect) {
              route.params.onSelect(location);
            }

            navigation.pop();
          }}>
          Select chosen location
        </PrimaryButton>
        <PrimaryButton onPress={useMyLocation} style={{flex: 1}}>
          Use my location
        </PrimaryButton>
      </View>
    </View>
  );
};

export {MapLocationPicker};
