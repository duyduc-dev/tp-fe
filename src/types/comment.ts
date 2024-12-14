import { UserDetail } from '@/types/user.ts';

export enum CommentType {
  LESSON = 'LESSON',
}

export type CreateCommentRequest = {
  content: string;
  rootId: string;
  parentId?: string;
  type: CommentType;
};

export type CommentResponse = {
  id: string;
  content: string;
  viewed: number;
  type: string;
  userId: string;
  rootId: string;
  parentId?: string;
  createdAt: number;
  children: CommentResponse[];
  user: UserDetail;
};
