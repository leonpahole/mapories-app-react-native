import React from 'react';
import {View, Text, ToastAndroid} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Post} from '../../model/Post';
import {ColorScheme} from '../../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  likeComment,
  likePost,
  unlikeComment,
  unlikePost,
} from '../../api/post.api';
import {Comment} from '../../model/Comment';

export type ILikeButtonProps = {
  postId: string;
  comment: Comment;
  onLikeStatusChange(status: boolean): void;
};

const LikeCommentButton: React.FC<ILikeButtonProps> = ({
  postId,
  comment,
  onLikeStatusChange,
}) => {
  const likeInfo = comment.likes;

  const onPressLike = async () => {
    try {
      if (likeInfo.myLike) {
        await unlikeComment(postId, comment.id);
      } else {
        await likeComment(postId, comment.id);
      }

      onLikeStatusChange(!likeInfo.myLike);
    } catch (e) {
      ToastAndroid.show('An error has occurred.', ToastAndroid.LONG);
      console.log('Like / unlike error');
      console.log(e);
    }
  };

  return (
    <TouchableOpacity style={{marginRight: 10}} onPress={onPressLike}>
      <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
        <Icon
          name="heart"
          size={25}
          color={likeInfo.myLike ? ColorScheme.red : ColorScheme.grayLight}
        />
        {likeInfo.likesAmount > 0 && (
          <Text style={{color: ColorScheme.gray}}>{likeInfo.likesAmount}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export {LikeCommentButton};
