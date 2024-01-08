import React from "react";
import store from "./store";
import { Provider } from "@reduxjs/toolkit";

export default function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
