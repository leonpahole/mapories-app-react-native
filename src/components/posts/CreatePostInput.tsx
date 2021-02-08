import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useLoggedInUser} from '../../hooks/useLoggedInUser';
import {Post} from '../../model/Post';
import {RootNavigatorScreens} from '../../navigation/RootNavigator';
import {ColorScheme} from '../../styles/colors';
import {StyledTextInput} from '../styled/input/StyledTextInput';

interface CreatePostInputProps {
  onCreatePost(post: Post): void;
}

const CreatePostInput: React.FC<CreatePostInputProps> = ({onCreatePost}) => {
  const navigation = useNavigation();
  const loggedInUser = useLoggedInUser();

  return (
    <StyledTextInput
      onTouchStart={() => {
        navigation.navigate(RootNavigatorScreens.CreatePost, {
          onCreatePost,
        });
      }}
      showSoftInputOnFocus={false}
      placeholder={`What is on your mind, ${loggedInUser?.name}?`}
      style={{
        backgroundColor: ColorScheme.white,
        borderColor: ColorScheme.grayLight,
        marginBottom: 10,
      }}
    />
  );
};

export {CreatePostInput};
