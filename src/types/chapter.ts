import { LessonDetail } from './lesson';

export type ChapterDetail = {
  id: string;
  title: string;
  courseId: string;
  position: number;
  lessonCount: number;
  systemStatus: string;
  createAt: number;
};

export type ChapterDetailWithLesson = ChapterDetail & {
  lessons: LessonDetail[];
};
