const commonRoute = {
  ROOT: '/',
  AUTH: '/auth',
  AUTH_LOGIN: '/auth/login',
  SIGNUP: '/auth/sign-up',
  SIGNUP2: '/auth/sign-up-2',
  LOGIN2: '/auth/login2',
  COURSE: '/courses',
  COURSE_DETAILS: '/courses/:slug',
  PAYMENT_COURSE_DETAILS: '/courses/payment/:slug',
  NOTIFICATION: '/notification',
  ACCOUNT: '/account',
  BLOG: '/blog',
  STUDYING: '/studying/:slug',
  INTRO: '/intro',
  SETTINGS: '/settings',
  SETTINGS_ACCOUNT: '/settings/account',
  SETTINGS_SECURITY: '/settings/security',
};

export const Routes = Object.freeze({
  ...commonRoute,
});
