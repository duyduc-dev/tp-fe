export const Constants = Object.freeze({
  WIDTH_SIDE_BAR: 260,
  WIDTH_SIDE_BAR_SMALL: 80,

  WIDTH_SIDE_BAR_LESSON: 320,
});

export const API_URL = Object.freeze({
  auth: {
    login: '/auth/login',
    signUpVerify: '/auth/signup-verify',
    signUpConfirm: '/auth/sign-up',
    authInfo: '/auth/auth-info',
    googleLogin: '/auth/google',
    logout: '/auth/logout',
  },
  courses: {
    paymentCourse: '/courses/payment-course/:id',
    all: '/courses',
    courseDetailBySlug: '/courses/slug/:slug',
    courseChapters: '/courses/:slug/chapters',
    courseLessons: '/courses/:slug/lessons',
    register: '/courses/register/:courseId',
    nextLesson: '/courses/next-lesson',
  },
  lesson: {
    detail: '/lesson/:id',
    nextLesson: '/lesson/next-lesson',
  },
  device: {
    index: '/device',
  },
  comment: {
    index: '/comment',
  },
  user: {
    survey: '/user/survey',
  },
});

export const Breakpoint = Object.freeze({
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
});
