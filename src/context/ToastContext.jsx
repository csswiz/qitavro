import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', title = null) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    const newToast = { id, message, type, title };
    
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div 
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4"
        aria-live="polite"
      >
        {toasts.map((toast) => {
          const isSuccess = toast.type === 'success';
          const isError = toast.type === 'error';
          
          return (
            <div
              key={toast.id}
              className="pointer-events-auto bg-charcoal text-ivory border border-gold/40 rounded shadow-xl p-3.5 flex items-start gap-3 transition-all duration-300 transform translate-y-0 opacity-100"
            >
              <div className="mt-0.5 flex-shrink-0 text-gold">
                {isSuccess && <CheckCircle2 className="w-5 h-5 text-gold" />}
                {isError && <AlertCircle className="w-5 h-5 text-rose" />}
                {!isSuccess && !isError && <Info className="w-5 h-5 text-stone" />}
              </div>
              <div className="flex-1 min-w-0">
                {toast.title && (
                  <p className="font-serif font-medium text-sm text-ivory mb-0.5">
                    {toast.title}
                  </p>
                )}
                <p className="text-xs text-stone-light leading-relaxed font-sans">
                  {toast.message}
                </p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-stone hover:text-ivory transition-colors p-1"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
