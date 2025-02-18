"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "_store/store";
import React from "react";
import ProtectedRoute from "./layout/protected/ProtectedRoute";

const AppMainEntry = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ProtectedRoute>{children}</ProtectedRoute>
    </PersistGate>
  </Provider>
);

export default AppMainEntry;
