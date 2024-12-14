import { LessonStatus } from '@/constants/enums/Lessons.ts';

export type ChangeLessonDetailStatus = {
  id: string;
  status: LessonStatus;
};
