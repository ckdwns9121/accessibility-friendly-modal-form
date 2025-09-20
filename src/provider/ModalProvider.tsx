import { createContext, useContext, useState, type ReactNode } from "react";

import Modal from "../components/Modal";

export interface FormData {
  name: string;
  email: string;
  position: string;
  github?: string;
}

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

  const openFormModal = (): Promise<FormData | null> => {
    return new Promise((resolve) => {
      setModalState({
        isOpen: true,
        resolve,
      });
    });
  };

  const handleClose = () => {
    if (modalState.resolve) {
      modalState.resolve(null);
    }
    setModalState({ isOpen: false, resolve: null });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    const result: FormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      position: formData.get("position") as string,
      github: (formData.get("github") as string) || undefined,
    };

    if (modalState.resolve) {
      modalState.resolve(result);
    }
    setModalState({ isOpen: false, resolve: null });
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
