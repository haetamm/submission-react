import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './authUser/reducer';
import threadReducer from './thread/reducer';
import commentReducer from './comment/reducer';
import isPreloadReducer from './isPreload/reducer';
import usersReducer from './user/reducer';
import sharedReducer from './shared/reducer';
import threadDetailReducer from './threadDetail/reducer';
import leaderboardReducer from './leaderboard/reducer';
import { modalReducer } from './modal/reducer';

const store = configureStore({
  reducer: {
    users: usersReducer,
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    threads: threadReducer,
    comments: commentReducer,
    shared: sharedReducer,
    threadDetail: threadDetailReducer,
    leaderboards: leaderboardReducer,
    modal: modalReducer
  }
});

export default store;