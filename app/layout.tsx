// app/layout.tsx
"use client";

import "./globals.css";
import { ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../src/theme";
import { Provider } from "react-redux";
import { store } from "../src/store";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
