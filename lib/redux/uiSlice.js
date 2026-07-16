import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    loginPromptOpen: false,
  },
  reducers: {
    openLoginPrompt: (state) => {
      state.loginPromptOpen = true;
    },
    closeLoginPrompt: (state) => {
      state.loginPromptOpen = false;
    },
  },
});

export const { openLoginPrompt, closeLoginPrompt } = uiSlice.actions;
export default uiSlice.reducer;
