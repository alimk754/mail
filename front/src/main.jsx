import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";

import { Link } from "react-router-dom";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App></App>
  
  </StrictMode>,
)
