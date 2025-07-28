// src/components/ToastContext.jsx
import React, { useState, useCallback } from 'react';
import { CToaster, CToast, CToastBody } from '@coreui/react';
import { ToastContext } from '../hooks/ToastContext';



export const ToastProvider = ({ children }) => {

    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, color = 'info') => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, color }]);
    }, []);

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

  return (
    <ToastContext.Provider value={{ showToast }}>
        {children}
            <CToaster placement="top-center" className="toaster-container">
                {toasts.map((toast) => (
                    <CToast
                        key={toast.id}
                        color={toast.color}
                        autohide
                        visible
                        onClose={() => removeToast(toast.id)}
                    >
                        <CToastBody>{toast.message}</CToastBody>
                    </CToast>
                ))}
            </CToaster>
    </ToastContext.Provider>
  );
};
