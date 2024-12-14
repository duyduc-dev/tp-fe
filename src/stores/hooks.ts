import {
  createDispatchHook,
  createSelectorHook,
  createStoreHook,
  type TypedUseSelectorHook,
} from 'react-redux';

import { StoreContext } from '.';
import { GlobalState } from './state';
import { AppDispatch, AppStore } from './types';

export const useStore: () => AppStore = createStoreHook(StoreContext);
export const useAppDispatch: () => AppDispatch = createDispatchHook(StoreContext);
export const useAppSelector: TypedUseSelectorHook<GlobalState> = createSelectorHook(StoreContext);
