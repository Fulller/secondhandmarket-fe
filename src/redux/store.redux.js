import { configureStore } from "@reduxjs/toolkit";
import { setLS } from "@tools/localStorage.tool";

import authReducer from "./slices/auth.slice";
import settingReducer from "./slices/setting.slice";
import searchReducer from "./slices/search.slice";

const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  setLS("auth", state.auth);
  setLS("settings", state.setting);
  return result;
};

export default configureStore({
  reducer: {
    auth: authReducer,
    setting: settingReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});
