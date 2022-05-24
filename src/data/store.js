import { configureStore } from '@reduxjs/toolkit'
import dataSlice from './dataSlice';

export default configureStore({
  reducer: {
      books: dataSlice
  }
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
