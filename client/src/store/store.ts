import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import searchReducer from './slices/searchSlice';

const store = configureStore({
  reducer: {
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()
export default store;
