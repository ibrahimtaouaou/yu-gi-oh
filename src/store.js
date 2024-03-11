import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "./features/cards/cardSlice";
import userReducer from "./features/user/userSlice";

const store = configureStore({
  reducer: {
    card: cardReducer,
    user: userReducer,
  },
});

export default store;
