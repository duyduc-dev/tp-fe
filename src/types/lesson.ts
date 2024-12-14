import { LessonStatus, LessonType } from '@/constants/enums/Lessons.ts';

export type UpdateLastLessonRequest = {
  courseId: string;
  currentLessonId: string;
};

export type LessonDetail = {
  id: string;
  chapterId: string;
  duration: number;
  lessonStatus: LessonStatus;
  lessonType: LessonType;
  numericalOrder: number;
  order: number;
  title: string;
  videoId: string;
  content: string;
  tpEditorUrl?: string | null;
  code: string;
  question: string;
  createdAt: string;
  updatedAt: string;
  nextLessonId: string | null;
  previousLessonId: string | null;
  answers?: LessonAnswerDetail[];
};

export type LessonAnswerDetail = {
  content?: string;
  correct: boolean;
  createdDate: string;
  id: string;
  lessonId: string;
  question: string;
  systemStatus: string;
  title: string;
  updatedDate: string;
};
