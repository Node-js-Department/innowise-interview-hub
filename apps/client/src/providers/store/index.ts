import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import questionsReducer from './slices/questionsSlice';
import userReducer from './slices/userSlice';
import interviewReducer from './slices/interviewSlice';

// Combine reducers
const rootReducer = combineReducers({
  questions: questionsReducer,
  users: userReducer,
  interview: interviewReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});

export type TStateModel = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;