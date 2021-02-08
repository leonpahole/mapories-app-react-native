import {Comment} from '../model/Comment';
import {MaporyMapItem} from '../model/MaporyMapItem';
import {PaginatedResponse} from '../model/PaginatedResponse';
import {CreateOrUpdatePostData, Post} from '../model/Post';
import {getRequest, patchFormDataRequest, postRequest} from './api';

export const getFeed = async (
  pageNumber: number,
  pageSize: number = 10,
): Promise<PaginatedResponse<Post>> => {
  return getRequest<PaginatedResponse<Post>>(
    `/post/feed?pageNum=${pageNumber}&pageSize=${pageSize}`,
    true,
  );
};

export const getPostsForUser = async (
  userId: string | null = null,
  pageNumber: number,
  pageSize: number = 10,
): Promise<PaginatedResponse<Post>> => {
  return await getRequest<PaginatedResponse<Post>>(
    `/post/my${
      userId ? '/' + userId : ''
    }?pageNum=${pageNumber}&pageSize=${pageSize}`,
    true,
  );
};

export const getFeedMapData = async (): Promise<MaporyMapItem[]> => {
  return await getRequest<MaporyMapItem[]>(`/post/my-mapories-feed`);
};

export const createPost = async (
  post: CreateOrUpdatePostData,
): Promise<Post> => {
  return await postRequest<Post>(`/post`, post);
};

export const updatePicturesForPost = async (
  postId: string,
  uris: string[],
): Promise<string[]> => {
  const formData = new FormData();
  uris.forEach((uri) =>
    formData.append('pictures', {
      uri: uri,
      type: 'image/png',
      name: uri.split('/').pop(),
    }),
  );

  const data = await patchFormDataRequest<{images: string[]}>(
    `/post/update-pictures/${postId}`,
    formData,
  );
  return data.images;
};

export const likePost = async (id: string): Promise<void> => {
  await postRequest<Post>(`/post/like/${id}`);
};

export const unlikePost = async (id: string): Promise<void> => {
  await postRequest<Post>(`/post/unlike/${id}`);
};

export const getPostById = async (id: string): Promise<Post> => {
  return await getRequest<Post>(`/post/${id}`);
};

export const createComment = async (
  id: string,
  content: string,
): Promise<Comment> => {
  return await postRequest<Comment>(`/comment/post/${id}`, {
    content,
  });
};

export const getPostComments = async (
  id: string,
  pageNum: number,
  pageSize: number = 10,
): Promise<PaginatedResponse<Comment>> => {
  return getRequest<PaginatedResponse<Comment>>(
    `/comment/post/${id}?pageNum=${pageNum}&pageSize=${pageSize}`,
  );
};

export const likeComment = async (
  postId: string,
  commentId: string,
): Promise<void> => {
  await postRequest<void>(`/comment/post/${postId}/${commentId}/like`);
};

export const unlikeComment = async (
  postId: string,
  commentId: string,
): Promise<void> => {
  await postRequest<void>(`/comment/post/${postId}/${commentId}/unlike`);
};
