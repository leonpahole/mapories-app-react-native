import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Keyboard,
  RefreshControl,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {getPostComments} from '../../api/post.api';
import {Comment} from '../../model/Comment';
import {
  initialPaginationInfo,
  PaginationData,
} from '../../model/PaginatedResponse';
import {UserExcerpt, UserProfile} from '../../model/UserExcerpt';
import {Spinner} from '../common/Spinner';
import {PostCommentInput} from './PostCommentInput';
import {PostCommentListItem} from './PostCommentListItem';

export type IPostCommentsProps = {
  postId: string;
  headerTopComponent?: any;
  onUserPress?(user: UserExcerpt): void;
};

const PostComments: React.FC<IPostCommentsProps> = ({
  postId,
  headerTopComponent = null,
  onUserPress,
}) => {
  const [commentData, setCommentData] = useState<PaginationData<Comment>>({
    data: [],
    pagination: initialPaginationInfo,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  async function fetchComments(doRefresh: boolean = false) {
    if (!doRefresh && !commentData.pagination.moreAvailable) {
      return;
    }

    try {
      let pageNumber = commentData.pagination.pageNumber;
      if (doRefresh) {
        pageNumber = 0;
      }

      let fetchedCommentResponse = await getPostComments(postId, pageNumber);

      setCommentData({
        data: doRefresh
          ? [...fetchedCommentResponse.data]
          : [...commentData.data, ...fetchedCommentResponse.data],
        pagination: {
          moreAvailable: fetchedCommentResponse.moreAvailable,
          pageNumber: pageNumber + 1,
        },
      });
    } catch (e) {
      ToastAndroid.show('An error has occured.', ToastAndroid.LONG);
      console.log('Fetch posts error');
      console.log(e);
    }

    setLoading(false);
    setRefreshing(false);
  }

  useEffect(() => {
    fetchComments(true);
  }, [postId]);

  const onLikeStatusChange = (id: string, status: boolean) => {
    setCommentData((cd) => {
      return {
        ...cd,
        data: cd.data.map((c) => {
          if (c.id === id) {
            return {
              ...c,
              likes: {
                ...c.likes,
                myLike: status,
                likesAmount: c.likes.likesAmount + (status ? 1 : -1),
              },
            };
          }

          return c;
        }),
      };
    });
  };

  return (
    <View>
      <FlatList
        keyboardShouldPersistTaps={'always'}
        data={commentData.data}
        renderItem={({item}) => (
          <PostCommentListItem
            postId={postId}
            comment={item}
            onLikeStatusChange={(s) => {
              onLikeStatusChange(item.id, s);
            }}
            onUserPress={() => {
              onUserPress && onUserPress(item.author);
            }}
          />
        )}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true);
              await fetchComments(true);
            }}
          />
        }
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          fetchComments();
        }}
        ListHeaderComponent={() => {
          let createPostInput = (
            <View style={{marginTop: 20}}>
              <PostCommentInput
                onCommentCreate={(c: Comment) => {
                  Keyboard.dismiss();
                  setCommentData({
                    ...commentData,
                    data: [c, ...commentData.data],
                  });
                }}
                postId={postId}
              />
            </View>
          );

          return (
            <View style={{marginBottom: 10}}>
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
      />
    </View>
  );
};

export {PostComments};
