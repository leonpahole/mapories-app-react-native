import {AppNotification} from '../model/AppNotification';
import {Chatroom, ChatroomMessage, LatestChatItem} from '../model/Chat';
import {CursorPaginatedResponse} from '../model/PaginatedResponse';
import {getRequest} from './api';

export const getNotifications = async (
  cursor?: number,
): Promise<CursorPaginatedResponse<AppNotification>> => {
  return await getRequest<CursorPaginatedResponse<AppNotification>>(
    `/notification?pageSize=20${cursor ? `&cursor=${cursor}` : ''}`,
  );
};
