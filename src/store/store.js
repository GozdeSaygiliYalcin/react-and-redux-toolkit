import { configureStore } from "@reduxjs/toolkit";
import { authSlice, userSlice, mainSlice, colorSlice } from "./features";
const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    main: mainSlice,
    color: colorSlice,
  },
});
export default store;
