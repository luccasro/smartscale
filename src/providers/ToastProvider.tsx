import { Toast } from 'components';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ToastType } from 'types';

interface ToastContextProps {
  showToast: (toast: ToastType) => void;
  toast: ToastType | undefined;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = useState<ToastType | undefined>();

  const showToast = (toast: ToastType) => {
    const { text, type } = toast;
    setToast({ text, type });

    setTimeout(() => {
      setToast(undefined);
    }, 4000);
  };

  return (
    <ToastContext.Provider value={{ showToast, toast }}>
      {children}
      {toast && <Toast toast={toast} />}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
