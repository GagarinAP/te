import { createStore, applyMiddleware, Store, Reducer } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api, init as initApiConnectors } from "store/api";
import { reducers } from "./reducers";
import sagas from "./sagas";

// ===========================================================================================
// PERSIST CONFIG SETUP
// ===========================================================================================

const persistConfig = {
  key: "root",
  whitelist: ["list"],
  timeout: 0,
  storage: AsyncStorage,
};

// ===========================================================================================
// MIDDLEWARE SETUP
// ===========================================================================================

const sagasMiddleware = createSagaMiddleware({ context: { api } });

const persistedReducer: Reducer = persistReducer(persistConfig, reducers);

let store: Store;
let persistor;

export type RootState = ReturnType<typeof reducers>;

const middlewares = [sagasMiddleware];

if (__DEV__) {
  const createDebugger = require("redux-flipper").default;
  middlewares.push(createDebugger());
}

// ===========================================================================================
// STORE CREATION
// ===========================================================================================

export default () => {
  store = createStore(persistedReducer, {}, applyMiddleware(...middlewares));

  initApiConnectors(store);

  sagasMiddleware.run(sagas);

  persistor = persistStore(store);

  return { store, persistor };
};
