import {UserExcerpt} from './UserExcerpt';

export type ChatroomMessage = {
  createdAt: Date;
  sender: UserExcerpt;
  content: string;
};
