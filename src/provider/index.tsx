"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ReactNode } from "react";
import { Toaster } from "sonner";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      {children} <Toaster richColors position="top-center" duration={3000} />
    </Provider>
  );
};

export default Providers;
