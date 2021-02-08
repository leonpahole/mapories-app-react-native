import {PaginatedResponse} from '../model/PaginatedResponse';
import {UserExcerpt, UserProfile} from '../model/UserExcerpt';
import {getRequest} from './api';

export const searchUsers = async (
  q: string,
  pageNumber: number,
  pageSize: number = 10,
): Promise<PaginatedResponse<UserExcerpt>> => {
  return getRequest<PaginatedResponse<UserExcerpt>>(
    `/user/search?q=${q}&pageNum=${pageNumber}&pageSize=${pageSize}`,
    true,
  );
};

export const getMyProfile = async (): Promise<UserProfile> => {
  return getRequest<UserProfile>(`/user/profile`, true);
};

export const getUserProfile = async (userId: string): Promise<UserProfile> => {
  return getRequest<UserProfile>(`/user/${userId}`, true);
};
