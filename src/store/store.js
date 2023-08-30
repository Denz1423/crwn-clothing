// import { compose, createStore, applyMiddleware } from "redux";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from 'redux-persist/lib/storage';
import logger from "redux-logger";

import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";

const middleWares = [process.env.NODE_ENV !== "production" && logger].filter(
  Boolean
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middleWares),
});

// const persistConfig = {
//     key: 'root',
//     storage,
//     backlist: ['user']
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const composedEnhancers = compose(applyMiddleware(...middleWares));

// export const store = createStore(persistedReducer, undefined, composedEnhancers);

// export const persistor = persistStore(store);
