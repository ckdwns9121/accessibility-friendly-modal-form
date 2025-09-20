import "modern-normalize";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ModalProvider } from "./provider/ModalProvider";
import ModalFormPage from "./ModalFormPage";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
  <StrictMode>
    <ModalProvider>
      <ModalFormPage />
    </ModalProvider>
  </StrictMode>
);
