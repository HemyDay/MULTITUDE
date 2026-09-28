"use client";

import { useEffect, useRef } from "react";
import { Toast } from "@/components/composition/Toast";

interface ToastItem {
  id: string;
  variant: "success" | "warning" | "info" | "destructive";
  title: string;
  description?: string;
  duration?: number;
}

interface ToastContainerProps {
  toasts: ToastItem[];
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50 pointer-events-auto">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onRemove={() => onRemove(toast.id)}
        />
      ))}
    </div>
  );
}

function ToastItem({
  toast,
  onRemove,
}: {
  toast: ToastItem;
  onRemove: () => void;
}) {
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const duration = toast.duration || 3000;
    timeoutRef.current = setTimeout(() => {
      onRemove();
    }, duration);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [toast.id, toast.duration, onRemove]);

  return (
    <div className="animate-in fade-in slide-in-from-right-2 duration-200">
      <Toast
        variant={toast.variant}
        title={toast.title}
        description={toast.description}
        onClose={onRemove}
      />
    </div>
  );
}
