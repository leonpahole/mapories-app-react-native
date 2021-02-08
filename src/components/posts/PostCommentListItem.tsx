import dayjs from 'dayjs';
import React from 'react';
import {View, Text} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Comment} from '../../model/Comment';
import {ColorScheme} from '../../styles/colors';
import {Avatar} from '../common/Avatar';
import {LikeCommentButton} from './LikeCommentButton';

export type IPostCommentListItemProps = {
  comment: Comment;
  onLikeStatusChange(status: boolean): void;
  postId: string;
  onUserPress?(): void;
};

const PostCommentListItem: React.FC<IPostCommentListItemProps> = ({
  comment,
  onLikeStatusChange,
  postId,
  onUserPress,
}) => {
  return (
    <View
      style={{
        backgroundColor: ColorScheme.white,
        elevation: 2,
        marginTop: 10,
        padding: 10,
      }}>
      <TouchableWithoutFeedback
        onPress={() => {
          onUserPress && onUserPress();
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Avatar source={require('../../assets/defaultUser.jpg')} />
          <View style={{marginLeft: 10}}>
            <Text style={{fontWeight: 'bold'}}>{comment.author.name}</Text>
            <Text style={{color: ColorScheme.gray}}>
              Posted {dayjs(comment.postedAt).fromNow()}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={{marginTop: 10, marginLeft: 10, marginBottom: 1}}>
        <Text style={{color: ColorScheme.gray}}>{comment.content}</Text>
      </View>
      <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 5}}>
        <LikeCommentButton
          postId={postId}
          comment={comment}
          onLikeStatusChange={onLikeStatusChange}
        />
      </View>
    </View>
  );
};

export {PostCommentListItem};
