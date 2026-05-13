import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  loading?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  loading,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded-lg";

  const variants = {
    primary: "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]",
    ghost: "text-[var(--text-muted)] hover:bg-[var(--elevated)] hover:text-[var(--text)]",
    outline:
      "border border-[var(--border)] text-[var(--text)] hover:border-[var(--primary)]/50 hover:text-[var(--primary)]",
    danger: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], disabled && "opacity-50 cursor-not-allowed", className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : null}
      {children}
    </button>
  );
}
