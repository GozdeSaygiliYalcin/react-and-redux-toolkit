import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  group1: "yellow",
  group2: "yellow",
};

const colorSlice = createSlice({
  name: "color",
  initialState: initialState,
  reducers: {
    setGroup1: (state, action) => {
      state.group1 = action.payload;
    },
    setGroup2: (state, action) => {
      state.group2 = action.payload;
    },
  },
});

export const { setGroup1, setGroup2 } = colorSlice.actions;

export default colorSlice.reducer;
