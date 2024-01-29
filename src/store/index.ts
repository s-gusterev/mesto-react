import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import cardsReducer from "./cardsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cards: cardsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
