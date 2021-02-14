import {Chatroom, ChatroomMessage, LatestChatItem} from '../model/Chat';
import {CursorPaginatedResponse} from '../model/PaginatedResponse';
import {getRequest} from './api';

export const getLatestChats = async (): Promise<LatestChatItem[]> => {
  return await getRequest<LatestChatItem[]>(`/chat/latest-chats`);
};

export const getChatsForChatroom = async (
  chatroomId: string,
  cursor?: number,
): Promise<CursorPaginatedResponse<ChatroomMessage>> => {
  return await getRequest<CursorPaginatedResponse<ChatroomMessage>>(
    `/chat/rooms/${chatroomId}/messages/?pageSize=20${
      cursor ? `&cursor=${cursor}` : ''
    }`,
  );
};

export const getChatroom = async (chatroomId: string) => {
  return await getRequest<Chatroom>(`/chat/${chatroomId}`);
};
