import { createContext, useContext, useState, type ReactNode, useRef } from "react";

import Modal from "../components/Modal";
import type { FormData } from "../schemas/formSchema";

interface ModalContextType {
  openFormModal: () => Promise<FormData | null>;
}

const ModalContext = createContext<ModalContextType | null>(null);

interface ModalState {
  isOpen: boolean;
  resolve: ((value: FormData | null) => void) | null;
}

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    resolve: null,
  });

  const prevActiveElementRef = useRef<HTMLElement | null>(null);

  const openFormModal = (): Promise<FormData | null> => {
    prevActiveElementRef.current = document.activeElement as HTMLElement;

    return new Promise((resolve) => {
      setModalState({
        isOpen: true,
        resolve,
      });
    });
  };

  const restoreFocus = () => {
    if (prevActiveElementRef.current) {
      prevActiveElementRef.current.focus();
    }
  };

  const handleClose = () => {
    if (modalState.resolve) {
      modalState.resolve(null);
    }
    setModalState({ isOpen: false, resolve: null });

    queueMicrotask(restoreFocus);
  };

  const handleSubmit = (data: FormData) => {
    if (modalState.resolve) {
      modalState.resolve(data);
    }
    setModalState({ isOpen: false, resolve: null });
    queueMicrotask(restoreFocus);
  };

  return (
    <ModalContext.Provider value={{ openFormModal }}>
      {children}
      <Modal isOpen={modalState.isOpen} onClose={handleClose} onSubmit={handleSubmit} />
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
