import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import Routes from "./router";







createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Routes></Routes>
  </StrictMode>
);
