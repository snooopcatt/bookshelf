import { configureStore } from '@reduxjs/toolkit'
import dataSlice from './dataSlice';
import selectionSlice from './selectionSlice';

export default configureStore({
  reducer: {
      books: dataSlice,
      selection: selectionSlice
  }
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
