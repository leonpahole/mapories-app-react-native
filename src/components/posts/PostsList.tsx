import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {RefreshControl, ToastAndroid, View, FlatList} from 'react-native';
import {getFeed, getPostsForUser} from '../../api/post.api';
import {useLoggedInUser} from '../../hooks/useLoggedInUser';
import {
  initialPaginationInfo,
  PaginatedResponse,
  PaginationData,
} from '../../model/PaginatedResponse';
import {Post} from '../../model/Post';
import {ScreenLocation} from '../../model/ScreenLocation';
import {FriendStatus} from '../../model/UserExcerpt';
import {RootNavigatorScreens} from '../../navigation/RootNavigator';
import {SideStackNavigatorScreens} from '../../navigation/SideStackNavigator';
import {Spinner} from '../common/Spinner';
import {SubtitleText} from '../styled/typography/SubtitleText';
import {CreatePostInput} from './CreatePostInput';
import {PostsListItem} from './PostsListItem';

export type PostListType = 'feed' | 'user';

export type IPostsListProps = {
  type: PostListType;
  userId?: string;
  headerTopComponent?: any;
  screenLocation: ScreenLocation;
  friendStatus?: FriendStatus;
};

const PostsList: React.FC<IPostsListProps> = ({
  type,
  userId,
  headerTopComponent = null,
  screenLocation,
  friendStatus,
}) => {
  const [postData, setPostData] = useState<PaginationData<Post>>({
    data: [],
    pagination: initialPaginationInfo,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const navigation = useNavigation<any>();

  const loggedInUser = useLoggedInUser();

  const showCreatePostInput =
    type === 'feed' || !userId || loggedInUser?.id === userId;

  const canSeePosts =
    friendStatus == null ||
    friendStatus === FriendStatus.FRIENDS ||
    friendStatus === FriendStatus.IS_ME;

  async function fetchPosts(doRefresh: boolean = false) {
    if (!canSeePosts) {
      setLoading(false);
      setPostData({
        data: [],
        pagination: initialPaginationInfo,
      });
      return;
    }

    if (!doRefresh && !postData.pagination.moreAvailable) {
      return;
    }

    try {
      let fetchedPostResponse: PaginatedResponse<Post> | null = null;
      let pageNumber = postData.pagination.pageNumber;
      if (doRefresh) {
        pageNumber = 0;
      }

      if (type === 'feed') {
        fetchedPostResponse = await getFeed(pageNumber);
      } else if (type === 'user') {
        fetchedPostResponse = await getPostsForUser(userId, pageNumber);
      }

      if (fetchedPostResponse) {
        setPostData({
          data: doRefresh
            ? [...fetchedPostResponse.data]
            : [...postData.data, ...fetchedPostResponse.data],
          pagination: {
            moreAvailable: fetchedPostResponse.moreAvailable,
            pageNumber: pageNumber + 1,
          },
        });
      }
    } catch (e) {
      ToastAndroid.show('An error has occured.', ToastAndroid.LONG);
      console.log('Fetch posts error');
      console.log(e);
    }

    setLoading(false);
    setRefreshing(false);
  }

  const onLikeStatusChange = (id: string, status: boolean) => {
    setPostData((d) => {
      return {
        ...d,
        data: d.data.map((p) => {
          if (p.post.id === id) {
            return {
              ...p,
              post: {
                ...p.post,
                likes: {
                  ...p.post.likes,
                  likesAmount: status
                    ? p.post.likes.likesAmount + 1
                    : p.post.likes.likesAmount - 1,
                  myLike: status,
                },
              },
            };
          }

          return p;
        }),
      };
    });
  };

  const onPostPress = (p: Post) => {
    if (screenLocation === 'main') {
      navigation.navigate(RootNavigatorScreens.SideStack, {
        screen: SideStackNavigatorScreens.SinglePostView,
        params: {postId: p.post.id, onLikeStatusChange},
      });
    } else if (screenLocation === 'side') {
      navigation.push(SideStackNavigatorScreens.SinglePostView, {
        postId: p.post.id,
        onLikeStatusChange,
      });
    }
  };

  const onUserPress = (p: Post) => {
    if (screenLocation === 'main') {
      navigation.navigate(RootNavigatorScreens.SideStack, {
        screen: SideStackNavigatorScreens.SingleProfileView,
        params: {userId: p.author.id},
      });
    } else if (screenLocation === 'side') {
      navigation.push(SideStackNavigatorScreens.SingleProfileView, {
        userId: p.author.id,
      });
    }
  };

  useEffect(() => {
    fetchPosts(true);
  }, [canSeePosts]);

  return (
    <View>
      <FlatList
        data={postData.data}
        renderItem={({item}) => (
          <PostsListItem
            post={item}
            onLikeStatusChange={(status) => {
              onLikeStatusChange(item.post.id, status);
            }}
            onPostPress={() => {
              onPostPress(item);
            }}
            onUserPress={() => {
              onUserPress(item);
            }}
          />
        )}
        keyExtractor={(item) => item.post.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true);
              await fetchPosts(true);
            }}
          />
        }
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          fetchPosts();
        }}
        ListHeaderComponent={() => {
          let createPostInput = showCreatePostInput ? (
            <CreatePostInput
              onCreatePost={(p: Post) => {
                setPostData({...postData, data: [p, ...postData.data]});
              }}
            />
          ) : null;

          return (
            <View>
              {headerTopComponent}
              {createPostInput}
            </View>
          );
        }}
        ListFooterComponent={() => (
          <View style={{marginVertical: 10}}>
            <Spinner loading={loading} />
          </View>
        )}
        ListEmptyComponent={() => {
          if (loading || refreshing) {
            return null;
          }
          if (canSeePosts) {
            return <SubtitleText>No posts yet.</SubtitleText>;
          } else {
            return (
              <SubtitleText>Add to friends to see their posts.</SubtitleText>
            );
          }
        }}
      />
    </View>
  );
};

export {PostsList};
