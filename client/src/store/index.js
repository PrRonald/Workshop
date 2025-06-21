import { configureStore } from '@reduxjs/toolkit';
import workshopReducer from './workshopSlice';

const store = configureStore({
  reducer: {
    workshops: workshopReducer
  }
});

export default store;