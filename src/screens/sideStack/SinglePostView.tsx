import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {getPostById} from '../../api/post.api';
import {Spinner} from '../../components/common/Spinner';
import {PostComments} from '../../components/posts/PostComments';
import {PostsListItem} from '../../components/posts/PostsListItem';
import {SubtitleText} from '../../components/styled/typography/SubtitleText';
import {Post} from '../../model/Post';
import {UserExcerpt, UserProfile} from '../../model/UserExcerpt';
import {
  SideStackNavigatorParamList,
  SideStackNavigatorScreens,
} from '../../navigation/SideStackNavigator';
import {ColorScheme} from '../../styles/colors';

type SinglePostViewNavigationProp = RouteProp<
  SideStackNavigatorParamList,
  'SinglePostView'
>;

const SinglePostView: React.FC = ({}) => {
  const navigation = useNavigation<any>();
  const route = useRoute<SinglePostViewNavigationProp>();
  const [loading, setLoading] = useState<boolean>(true);
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);

      try {
        const postF = await getPostById(route.params.postId);
        setPost(postF);
        navigation.setOptions({title: 'Post by ' + postF.author.name});
      } catch (e) {
        console.log('Fetch post error');
        console.log(e);
      }

      setLoading(false);
    }

    fetchPost();
  }, [route.params.postId]);

  let content = null;

  const onLikeStatusChange = (status: boolean) => {
    if (!post) {
      return;
    }

    setPost({
      ...post,
      post: {
        ...post.post,
        likes: {
          ...post.post.likes,
          likesAmount: status
            ? post.post.likes.likesAmount + 1
            : post.post.likes.likesAmount - 1,
          myLike: status,
        },
      },
    });

    if (route.params.onLikeStatusChange) {
      route.params.onLikeStatusChange(post.post.id, status);
    }
  };

  const onUserPress = () => {
    if (!post) {
      return;
    }

    navigation.push(SideStackNavigatorScreens.SingleProfileView, {
      userId: post.author.id,
    });
  };

  const onCommentUserPress = (user: UserExcerpt) => {
    navigation.push(SideStackNavigatorScreens.SingleProfileView, {
      userId: user.id,
    });
  };

  if (loading) {
    content = (
      <View>
        <Spinner loading={loading} />
      </View>
    );
  } else if (!post) {
    content = (
      <View>
        <SubtitleText>Post could not be found at this moment.</SubtitleText>
      </View>
    );
  } else {
    content = (
      <View
        style={{
          paddingHorizontal: 20,
          marginTop: 10,
        }}>
        <PostComments
          postId={post.post.id}
          onUserPress={onCommentUserPress}
          headerTopComponent={
            <PostsListItem
              card={false}
              post={post}
              onLikeStatusChange={(status) => {
                onLikeStatusChange(status);
              }}
              onUserPress={onUserPress}
            />
          }
        />
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: ColorScheme.white,
        height: '100%',
      }}>
      {content}
    </View>
  );
};

export {SinglePostView};
