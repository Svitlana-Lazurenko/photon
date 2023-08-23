import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authSlice from './auth/authReducer';

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
