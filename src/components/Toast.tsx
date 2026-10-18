import { useEffect } from "react";

interface ToastProps {
  message: string;
  visible: boolean;
  onDismiss: () => void;
}

export function Toast({ message, visible, onDismiss }: ToastProps) {
  useEffect(() => {
    if (!visible) return;
    const timeout = window.setTimeout(onDismiss, 2800);
    return () => window.clearTimeout(timeout);
  }, [visible, onDismiss]);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-8 left-1/2 z-[200] -translate-x-1/2 animate-[toast-in_180ms_ease-out] rounded-lg bg-[#222] px-4 py-3 text-sm font-medium text-white shadow-xl"
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}
