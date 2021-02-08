import React from 'react';
import {Image, ImageSourcePropType} from 'react-native';
import {ColorScheme} from '../../styles/colors';

export type IAvatarProps = {
  source: ImageSourcePropType;
};

const Avatar: React.FC<IAvatarProps> = ({source}) => {
  return (
    <Image
      style={{
        height: 50,
        width: 50,
        borderRadius: 50,
        borderColor: ColorScheme.gray,
        borderWidth: 0.2,
      }}
      source={source}
    />
  );
};

export {Avatar};
