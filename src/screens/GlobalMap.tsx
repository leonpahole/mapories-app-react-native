import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {useEffect} from 'react';
import {ToastAndroid, useWindowDimensions, View} from 'react-native';
import {getFeedMapData} from '../api/post.api';
import {BackButtonWithOverlay} from '../components/common/BackButtonWithOverlay';
import {Map} from '../components/map/Map';
import {MaporyMapItem} from '../model/MaporyMapItem';
import {RootNavigatorScreens} from '../navigation/RootNavigator';
import {SideStackNavigatorScreens} from '../navigation/SideStackNavigator';

const GlobalMap: React.FC = () => {
  const [mapData, setMapData] = useState<MaporyMapItem[]>([]);
  const dimensions = useWindowDimensions();

  const navigation = useNavigation<any>();

  useEffect(() => {
    async function fetchMapData() {
      try {
        const data = await getFeedMapData();
        setMapData(data);
      } catch (e) {
        ToastAndroid.show('An error has occured.', ToastAndroid.LONG);
        console.log('Fetch map error');
        console.log(e);
      }
    }

    fetchMapData();
  }, []);

  const onMarkerPress = (id: any) => {
    navigation.navigate(RootNavigatorScreens.SideStack, {
      screen: SideStackNavigatorScreens.SinglePostView,
      params: {postId: id},
    });
  };

  return (
    <View style={{height: '100%'}}>
      <BackButtonWithOverlay />
      <Map
        zoom={3}
        center={
          mapData.length > 0
            ? mapData[0].location
            : {latitude: 30, longitude: 31}
        }
        markers={mapData.map((d) => ({...d.location, id: d.id}))}
        style={{height: dimensions.height, width: dimensions.width}}
        zoomEnabled={true}
        scrollEnabled={true}
        onMarkerPress={onMarkerPress}
      />
    </View>
  );
};

export {GlobalMap};
