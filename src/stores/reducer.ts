import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import courseReducer from '@/features/courses/courseSlice';

import { GlobalState } from './state';
import { createReducer } from './utils';

const rootReducer = createReducer({
  course: courseReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
};

const persistedReducer = persistReducer<GlobalState>(persistConfig, rootReducer as any);

export default persistedReducer;
