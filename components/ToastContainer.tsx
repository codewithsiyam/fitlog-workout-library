"use client";

import { CheckCircle2 } from "lucide-react";
import { usePlan } from "@/context/PlanContext";

export default function ToastContainer() {
  const { toasts } = usePlan();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-4 left-1/2 z-50 flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-toast-in flex items-center gap-2 rounded-xl border border-border bg-surface2 px-4 py-3 text-sm font-medium text-white shadow-lg"
        >
          <CheckCircle2 size={18} className="shrink-0 text-accent" />
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
