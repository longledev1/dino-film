import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import ModalProvider from "@context/ModalProvider";

createRoot(document.getElementById("root")).render(
  <ModalProvider>
    <RouterProvider router={router} />
  </ModalProvider>,
);
