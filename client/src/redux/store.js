import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  user: userReducer
});

const baseStorage = (storage && typeof storage.getItem === 'function')
  ? storage
  : (typeof window !== 'undefined' ? window.localStorage : null);

const storageEngine = baseStorage
  ? {
      getItem: (key) => Promise.resolve(baseStorage.getItem(key)),
      setItem: (key, value) => Promise.resolve(baseStorage.setItem(key, value)),
      removeItem: (key) => Promise.resolve(baseStorage.removeItem(key)),
    }
  : null;

const persistConfig = {
  key: 'root',
  storage: storageEngine,
  version: 1,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);