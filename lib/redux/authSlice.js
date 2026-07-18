import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      if (typeof window !== "undefined") {
        localStorage.setItem("srinaar_token", action.payload.token);
        localStorage.setItem("srinaar_user", JSON.stringify(action.payload.user));
      }
    },
    // Merges updated fields into the stored user (e.g. after saving the
    // profile form) so the change is reflected immediately and survives a
    // page refresh — without this, edits would appear to "not save".
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      if (typeof window !== "undefined") {
        localStorage.setItem("srinaar_user", JSON.stringify(state.user));
      }
    },
    restoreSession: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("srinaar_token");
        localStorage.removeItem("srinaar_user");
      }
    },
  },
});

export const { setCredentials, restoreSession, updateUser, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectIsLoggedIn = (state) => Boolean(state.auth.token);
export const selectUser = (state) => state.auth.user;
