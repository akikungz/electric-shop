"use client";

import { CheckCircle2, CircleAlert, Info, X } from "lucide-react";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { cn } from "@/lib/utils";

type ToastVariant = "success" | "error" | "info";

interface ToastInput {
  title: string;
  description?: string;
  variant?: ToastVariant;
  durationMs?: number;
}

interface ToastItem extends ToastInput {
  id: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  toast: (input: ToastInput) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((item) => item.id !== id));
  }, []);

  const toast = useCallback(
    ({
      title,
      description,
      variant = "info",
      durationMs = 2600,
    }: ToastInput) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      setToasts((current) => [...current, { id, title, description, variant }]);

      window.setTimeout(() => {
        dismiss(id);
      }, durationMs);
    },
    [dismiss],
  );

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed right-4 bottom-4 z-[100] flex w-[min(92vw,24rem)] flex-col gap-2"
      >
        {toasts.map((item) => {
          const Icon =
            item.variant === "success"
              ? CheckCircle2
              : item.variant === "error"
                ? CircleAlert
                : Info;

          return (
            <div
              key={item.id}
              className={cn(
                "pointer-events-auto relative overflow-hidden rounded-lg border bg-background px-4 py-3 pr-10 shadow-xl backdrop-blur-sm animate-in slide-in-from-right-4 fade-in duration-300",
                item.variant === "success" &&
                  "border-emerald-400/40 text-emerald-700 dark:text-emerald-300",
                item.variant === "error" &&
                  "border-red-400/40 text-red-700 dark:text-red-300",
                item.variant === "info" &&
                  "border-slate-300/60 text-foreground",
              )}
            >
              <div className="flex items-start gap-2">
                <Icon className="mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <p className="text-sm font-semibold">{item.title}</p>
                  {item.description ? (
                    <p className="mt-0.5 text-xs opacity-90">
                      {item.description}
                    </p>
                  ) : null}
                </div>
              </div>
              <button
                type="button"
                aria-label="Dismiss alert"
                onClick={() => dismiss(item.id)}
                className="absolute top-2 right-2 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
}
