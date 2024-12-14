import { type PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@/stores/utils';

export type CourseState = {
  key: string;
  expireTime: number | null;
};

const initState: CourseState = {
  key: '',
  expireTime: null,
};

const courseSlice = createSlice({
  name: 'course',
  initialState: initState,
  reducers: {
    setCourseKey: (state, action: PayloadAction<string>) => {
      state.key = action.payload;
    },
    setExpireTime: (state, action: PayloadAction<number | null>) => {
      state.expireTime = action.payload;
    },
  },
});

const { reducer: courseReducer, actions } = courseSlice;

export const { setCourseKey, setExpireTime } = actions;

export default courseReducer;
