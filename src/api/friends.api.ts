import {FriendStatus, UserExcerpt} from '../model/UserExcerpt';
import {deleteRequest, getRequest, postRequest} from './api';

export const sendFriendRequest = async (
  userId: string,
): Promise<FriendStatus> => {
  const res = await postRequest<{newStatus: FriendStatus}>(
    `/user/send-friend-request/${userId}`,
  );

  return res.newStatus;
};

export const cancelFriendRequest = async (userId: string): Promise<void> => {
  await deleteRequest<void>(`/user/cancel-friend-request/${userId}`);
};

export const acceptFriendRequest = async (userId: string): Promise<void> => {
  await postRequest<void>(`/user/accept-friend-request/${userId}`);
};

export const declineFriendRequest = async (userId: string): Promise<void> => {
  await deleteRequest<void>(`/user/decline-friend-request/${userId}`);
};

export const removeFriendship = async (userId: string): Promise<void> => {
  await deleteRequest<void>(`/user/remove-friendship/${userId}`);
};

export const getMyFriends = async (): Promise<UserExcerpt[]> => {
  return await getRequest<UserExcerpt[]>(`/user/friends`);
};
