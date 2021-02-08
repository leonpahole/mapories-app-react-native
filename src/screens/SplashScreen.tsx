import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ColorScheme} from '../styles/colors';

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: 20,
  },
  heading: {
    fontSize: 50,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    color: ColorScheme.gray,
    marginBottom: 60,
  },
  mapImage: {
    height: 120,
    width: 120,
  },
});

export type ISplashScreenProps = {};

const SplashScreen: React.FC<ISplashScreenProps> = ({}) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>Mapories</Text>
      <Text style={styles.subtitle}>Put your memories on a map.</Text>
      <Image style={styles.mapImage} source={require('../assets/map.png')} />
    </View>
  );
};

export {SplashScreen};
