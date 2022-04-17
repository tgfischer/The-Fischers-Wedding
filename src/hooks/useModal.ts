import { useState, useCallback } from "react";

type ModalState = {
  isOpen: boolean;
};

type UseModalResult = {
  isOpen: boolean;
  openModal: (...args: unknown[]) => void;
  closeModal: (...args: unknown[]) => void;
};

export const useModal = (): UseModalResult => {
  const [{ isOpen }, setState] = useState<ModalState>({ isOpen: false });

  return {
    isOpen,
    openModal: useCallback(() => setState({ isOpen: true }), []),
    closeModal: useCallback(() => setState({ isOpen: false }), [])
  };
};
