import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer,persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({user:userReducer});

const persistconfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedRducer = persistReducer(persistconfig, rootReducer);

export const store = configureStore({
  reducer: persistedRducer,
  middleware:(getDefaultMiddlewere) => getDefaultMiddlewere({
    serializableCheck: false,
  }),
});


export const persistor = persistStore(store);
