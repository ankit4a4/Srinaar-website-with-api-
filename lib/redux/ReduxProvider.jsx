"use client";

import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import { restoreSession } from "./authSlice";

function SessionRestorer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("srinaar_token");
    const userRaw = localStorage.getItem("srinaar_user");
    if (token && userRaw) {
      try {
        dispatch(restoreSession({ token, user: JSON.parse(userRaw) }));
      } catch {
        // corrupted local storage — ignore, user will just need to log in again
      }
    }
  }, [dispatch]);

  return children;
}

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <SessionRestorer>{children}</SessionRestorer>
    </Provider>
  );
}
