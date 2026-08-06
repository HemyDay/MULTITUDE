"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { ToastContainer } from "./ToastContainer";

interface ToastItem {
  id: string;
  groupId?: string; // ID pour grouper les toasts (ex: pour remplacer loading par success)
  variant: "success" | "warning" | "info" | "destructive" | "loading";
  title: string;
  description?: string;
  duration?: number;
}

interface ToastContainerItem extends Omit<ToastItem, "variant"> {
  variant: "success" | "warning" | "info" | "destructive";
}

interface ToastContextType {
  addToast: (
    variant: ToastItem["variant"],
    title: string,
    description?: string,
    duration?: number,
    groupId?: string,
  ) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastsProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback(
    (
      variant: ToastItem["variant"],
      title: string,
      description?: string,
      duration?: number,
      groupId?: string,
    ) => {
      const id = Math.random().toString(36).substr(2, 9);
      const newToast: ToastItem = {
        id,
        groupId,
        variant,
        title,
        description,
        duration: duration || 3000,
      };

      setToasts((prev) => {
        // Si on a un groupId et que le toast est success/error, remplacer le toast info/warning/loading du même groupe
        if (groupId && (variant === "success" || variant === "destructive")) {
          return prev
            .filter(
              (t) =>
                !(
                  t.groupId === groupId &&
                  (t.variant === "info" ||
                    t.variant === "warning" ||
                    t.variant === "loading")
                ),
            )
            .concat(newToast);
        }

        return [...prev, newToast];
      });
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const displayToasts = toasts.filter(
    (toast) => toast.variant !== "loading"
  ) as ToastContainerItem[];

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={displayToasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToasts() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToasts must be used within ToastsProvider");
  }
  return context;
}
