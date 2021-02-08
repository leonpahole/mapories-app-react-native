import React from 'react';
import {View, Text, ToastAndroid} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Post} from '../../model/Post';
import {ColorScheme} from '../../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {likePost, unlikePost} from '../../api/post.api';

export type ILikeButtonProps = {
  post: Post;
  onLikeStatusChange(status: boolean): void;
};

const LikePostButton: React.FC<ILikeButtonProps> = ({
  post,
  onLikeStatusChange,
}) => {
  const likeInfo = post.post.likes;

  const onPressLike = async () => {
    try {
      if (likeInfo.myLike) {
        await unlikePost(post.post.id);
      } else {
        await likePost(post.post.id);
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

export {LikePostButton as LikeButton};
