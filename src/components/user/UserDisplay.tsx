import React from 'react';
import {View, Text} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Avatar} from '../common/Avatar';

export type IUserDisplayProps = {
  userName: string;
  onPress?(): void;
};

const UserDisplay: React.FC<IUserDisplayProps> = ({userName, onPress}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        onPress && onPress();
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Avatar source={require('../../assets/defaultUser.jpg')} />
        <View style={{marginLeft: 10}}>
          <Text style={{fontWeight: 'bold'}}>{userName}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export {UserDisplay};
