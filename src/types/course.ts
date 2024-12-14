import { PushNotificationType } from '@/constants/enums/PushNotificationType.ts';
import { LessonDetail } from '@/types/lesson.ts';

export type CourseDetail = {
  id: string;
  title: string;
  thumbnailUrl: string;
  currentLessonId: string;
  slug: string;
  viewed: number;
  description: string;
  price: number;
  content: string;
  code: string;
  courseType: string;
  discount: number;
  createdAt: number;
  updatedAt: number;
  registered: boolean;
};

export type CourseChapterList = {
  courseId: string;
  id: string;
  lessons: LessonDetail[];
  numericalOrder: number;
  title: string;
};

export type CourseDetailIncludedLesson = {
  course: CourseDetail;
  chapters: CourseChapterList[];
  registered: boolean;
  lastLessonId?: string;
};

export type PaymentCourseQRResponse = {
  qrCode: string;
  qrDataUrl: string;
  accountNo: string;
  accountName: string;
  addInfo: string;
  amount: number;
};

export enum PaymentCourseStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export type PaymentCoursePushNotification = {
  courseId: string;
  type: PushNotificationType;
  status: PaymentCourseStatus;
};
