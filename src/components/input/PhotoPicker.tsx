import React, {useState} from 'react';
import {Image, useWindowDimensions, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {ColorScheme} from '../../styles/colors';
import {EmptyButton} from '../styled/Buttons';
import {InputLabel} from '../styled/typography/InputLabel';
import {PhotoPickerModal} from './PhotoPickerModal';

export type IPhotoPickerProps = {
  onPictureSelected(uri: string): void;
  onPictureDeleted(index: number): void;
  pictures: string[];
};

const PhotoPicker: React.FC<IPhotoPickerProps> = ({
  onPictureSelected,
  onPictureDeleted,
  pictures,
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const dimensions = useWindowDimensions();

  const numberOfImages = 5;
  const margin = 10;
  const width =
    (dimensions.width - margin * (numberOfImages - 1) - 35) / numberOfImages;

  return (
    <View style={{marginTop: 15}}>
      <InputLabel>Pictures</InputLabel>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {pictures.map((uri, i) => {
          let marginLeft = 0;
          let marginRight = 0;
          const index = i % numberOfImages;
          if (index > 0) {
            marginLeft = margin / 2;
          }

          if (index < pictures.length - 1) {
            marginRight = margin / 2;
          }

          return (
            <TouchableWithoutFeedback
              onLongPress={() => {
                onPictureDeleted(i);
              }}>
              <Image
                key={uri}
                source={{uri}}
                style={{
                  height: width,
                  width: width,
                  margin: 5,
                  marginLeft,
                  marginRight,
                  borderRadius: 10,
                  borderColor: ColorScheme.grayLight,
                  borderWidth: 1,
                }}
              />
            </TouchableWithoutFeedback>
          );
        })}
      </View>
      <EmptyButton
        onPress={() => {
          setModalVisible(true);
        }}>
        Select pictures
      </EmptyButton>
      <PhotoPickerModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
        onImagePicker={(u) => {
          onPictureSelected(u);
        }}
      />
    </View>
  );
};

export {PhotoPicker};
