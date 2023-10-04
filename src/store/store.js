import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import loggerMiddleware from "redux-logger";
import storage from "redux-persist/lib/storage";

import orderReducer from "./slices/orderSlice";
import userReducer from "./slices/userSlice";

const combinedReducer = combineReducers({
  order: orderReducer,
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["employee"],
};

const persistedReducer = persistReducer(persistConfig, combinedReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      // redux logger
      .concat(loggerMiddleware),
});

export const persistor = persistStore(store);
export default store;
