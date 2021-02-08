import React from 'react';
import {Modal, View, Text, TouchableOpacity} from 'react-native';
import {SubtitleText} from '../styled/typography/SubtitleText';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {EmptyButton} from '../styled/Buttons';

type PickType = 'camera' | 'gallery';

export type IPhotoPickerModalProps = {
  onImagePicker(uri: string): void;
  visible: boolean;
  onClose(): void;
};

const PhotoPickerModal: React.FC<IPhotoPickerModalProps> = ({
  onImagePicker,
  visible,
  onClose,
}) => {
  const pickImage = (mode: PickType) => {
    const callback = (response: ImagePickerResponse) => {
      if (!response.uri) {
        return;
      }

      onImagePicker(response.uri);
      onClose();
    };

    if (mode === 'camera') {
      launchCamera(
        {
          mediaType: 'photo',
          maxHeight: 900,
          maxWidth: 900,
          quality: 0.5,
        },
        callback,
      );
    } else if (mode === 'gallery') {
      launchImageLibrary(
        {
          mediaType: 'photo',
          maxHeight: 900,
          maxWidth: 900,
          quality: 0.5,
        },
        callback,
      );
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View
        style={{
          justifyContent: 'center',
          flex: 1,
          margin: 30,
        }}>
        <View
          style={{
            backgroundColor: 'white',
            paddingHorizontal: 35,
            paddingVertical: 20,
            elevation: 5,
          }}>
          <SubtitleText>Select a picture with</SubtitleText>
          <TouchableOpacity
            style={{marginTop: 10, paddingVertical: 15}}
            onPress={() => {
              pickImage('camera');
            }}>
            <Text>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{paddingVertical: 15}}
            onPress={() => {
              pickImage('gallery');
            }}>
            <Text>Gallery</Text>
          </TouchableOpacity>
          <View>
            <EmptyButton onPress={onClose} style={{alignItems: 'flex-end'}}>
              Close
            </EmptyButton>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export {PhotoPickerModal};
