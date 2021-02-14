import {UserExcerpt} from './UserExcerpt';

export type ChatroomMessage = {
  id: string;
  createdAt: Date;
  sender: UserExcerpt;
  content: string;
};

export type BecomeOnlineMessage = {
  userId: string;
  chatroomId: string;
};

export type UpdateChatLogMessage = {
  chatroomId: string;
  message: ChatroomMessage;
};

export type LatestChatItem = {
  chatroomId: string;
  lastMessage: ChatroomMessage | null;
  otherUsers: UserExcerpt[];
  isNew?: boolean;
};

export type Chatroom = {
  name: string;
  participants: UserExcerpt[];
};
