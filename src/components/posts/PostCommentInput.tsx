import React, {useState} from 'react';
import {ToastAndroid, View} from 'react-native';
import {createComment} from '../../api/post.api';
import {Comment} from '../../model/Comment';
import {ColorScheme} from '../../styles/colors';
import {StyledTextInputWithButton} from '../styled/input/StyledTextInputWithButton';

export type IPostCommentInputProps = {
  onCommentCreate(comment: Comment): void;
  postId: string;
};

const PostCommentInput: React.FC<IPostCommentInputProps> = ({
  onCommentCreate,
  postId,
}) => {
  const [content, setContent] = useState<string>('');

  const onCommentCreatePress = async () => {
    if (content.trim().length === 0) {
      return;
    }

    try {
      const comment = await createComment(postId, content.trim());
      onCommentCreate(comment);
    } catch (e) {
      console.log('Create comment error');
      console.log(e);
      ToastAndroid.show('An error has occurred.', ToastAndroid.LONG);
    }
  };

  return (
    <View>
      <StyledTextInputWithButton
        placeholder={'Comment...'}
        style={{
          borderColor: ColorScheme.grayLight,
        }}
        iconName={'send'}
        onPress={onCommentCreatePress}
        onChangeText={(s) => setContent(s)}
      />
    </View>
  );
};

export {PostCommentInput};
