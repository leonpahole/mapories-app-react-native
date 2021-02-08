import React from 'react';
import {ActivityIndicator} from 'react-native';
import {ColorScheme} from '../../styles/colors';

export type ISpinnerProps = {
  loading: boolean;
};

const Spinner: React.FC<ISpinnerProps> = ({loading}) => {
  if (!loading) {
    return null;
  }

  return <ActivityIndicator color={ColorScheme.black} />;
};

export {Spinner};
