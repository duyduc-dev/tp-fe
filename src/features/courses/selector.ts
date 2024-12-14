import { createSelector } from '@reduxjs/toolkit';

import { GlobalState } from '@/stores/state';

const courseSelect = (state: GlobalState) => state.course;

export const selectCourseKey = createSelector(courseSelect, (state) => state.key);
export const selectExpireTimeCourse = createSelector(courseSelect, (state) => state.expireTime);
