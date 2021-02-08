import React, {useEffect, useState} from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {MapLocation} from '../../model/MaporyMapItem';
import {TouchableHighlight} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    height: 250,
    backgroundColor: 'transparent',
  },
  map: {
    flex: 1,
  },
  dot: {
    display: 'flex',
    flexDirection: 'row',
    width: 10,
    height: 10,
    backgroundColor: 'red',
    borderRadius: 25,
    opacity: 1,
  },
});

type MarkerData = MapLocation & {id: any};

export type IMapProps = {
  center?: MapLocation;
  markers?: MarkerData[];
  onPress?(): void;
  style?: StyleProp<ViewStyle>;
  zoomEnabled?: boolean;
  scrollEnabled?: boolean;
  zoom?: number;
  onMarkerPress?(id: any): void;
};

const Map: React.FC<IMapProps> = ({
  center = undefined,
  markers = [],
  onPress,
  style,
  zoomEnabled = false,
  scrollEnabled = false,
  zoom = 9,
  onMarkerPress,
}) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

  return (
    <View style={[styles.container, style]}>
      <MapboxGL.MapView
        style={[styles.map, {display: loading ? 'none' : 'flex'}]}
        onPress={() => onPress && onPress()}
        zoomEnabled={zoomEnabled}
        scrollEnabled={scrollEnabled}>
        <MapboxGL.Camera
          animationDuration={0}
          zoomLevel={zoom}
          centerCoordinate={
            center ? [center.longitude, center.latitude] : undefined
          }
        />
        <View>
          {markers.map((c) => (
            <MapboxGL.MarkerView
              key={c.id}
              id={c.id.toString()}
              coordinate={[c.longitude, c.latitude]}>
              <View style={styles.dot}>
                <TouchableHighlight
                  style={styles.dot}
                  onPress={() => {
                    onMarkerPress && onMarkerPress(c.id);
                  }}></TouchableHighlight>
              </View>
            </MapboxGL.MarkerView>
          ))}
        </View>
      </MapboxGL.MapView>
    </View>
  );
};

export {Map};
