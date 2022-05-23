import { configureStore } from '@reduxjs/toolkit'
import dataSlice from './dataSlice';
import selectionSlice from './selectionSlice';

export default configureStore({
  reducer: {
      books: dataSlice,
      selection: selectionSlice
  }
});
