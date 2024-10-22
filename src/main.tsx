import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { Toaster } from "@/components/ui/toaster.tsx";

import ThemeProvider from "@/components/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark">
      <App />
      <Toaster />
    </ThemeProvider>
  </StrictMode>
);
