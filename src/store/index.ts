import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { appReducer } from "./appSlice/appSlice";
import { appApi } from "api/appApi";

export const store = configureStore({
  reducer: {
    [appApi.reducerPath]: appApi.reducer,
    app: appReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(appApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
