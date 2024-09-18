import { configureStore } from '@reduxjs/toolkit';
import storeApi from '@/store/storeApi';
import storeAction from '@/store/storeAction';
export const store = configureStore({
  reducer: {
    storeApp: storeApi,
    storeAction: storeAction
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
