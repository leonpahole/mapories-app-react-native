import React from 'react';
import {Text, View} from 'react-native';
import {Post} from '../../model/Post';
import {Avatar} from './Avatar';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {ColorScheme} from '../../styles/colors';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

dayjs.extend(relativeTime);

export type IAuthorHeaderProps = {
  post: Post;
  onUserPress?(): void;
  onSubtitlePress?(): void;
};

const AuthorHeader: React.FC<IAuthorHeaderProps> = ({
  post,
  onUserPress,
  onSubtitlePress,
}) => {
  let placeText: string | null = null;
  if (post && post.post.mapory) {
    placeText = `${post.post.mapory.placeName}, ${dayjs(
      post.post.mapory.visitDate,
    ).fromNow()}`;
  }

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TouchableWithoutFeedback
        onPress={() => {
          onUserPress && onUserPress();
        }}>
        <Avatar source={require('../../assets/defaultUser.jpg')} />
      </TouchableWithoutFeedback>
      <View style={{marginLeft: 10}}>
        <TouchableWithoutFeedback
          onPress={() => {
            onUserPress && onUserPress();
          }}>
          <Text style={{fontWeight: 'bold'}}>{post.author.name}</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            onSubtitlePress && onSubtitlePress();
          }}>
          {placeText && (
            <Text style={{color: ColorScheme.gray}}>{placeText}</Text>
          )}
          <Text style={{color: ColorScheme.gray}}>
            Posted {dayjs(post.post.createdAt).fromNow()}
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export {AuthorHeader};
