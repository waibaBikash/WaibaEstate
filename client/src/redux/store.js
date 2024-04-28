import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useReducer } from './user/userSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';

const rootReducer = combineReducers({user:useReducer});

const persistconfig = {
  key: 'root',
  storage,
  version: 1,
}

const persistedRducer = persistReducer(persistconfig, rootReducer);
export const store = configureStore({
  reducer: persistedRducer,
  middleware:(getDefaultMiddlewere) => getDefaultMiddlewere({
    serializableCheck: false,
  }),
});


export const persistor = persistStore(store);
