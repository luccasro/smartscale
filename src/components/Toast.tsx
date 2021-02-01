import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { ToastType } from 'types';

interface ToastProps {
  toast?: ToastType;
}

export const Toast: React.FC<ToastProps> = ({ toast }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={!!toast}
    >
      <div
        className={`p-4 w-96 rounded-lg ${
          toast?.type === 'error' ? 'bg-red-500' : 'bg-green-500'
        } text-white`}
      >
        {toast?.text}
      </div>
    </Snackbar>
  );
};
