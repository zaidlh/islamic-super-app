import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "gold" | "success" | "warning" | "muted";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    default: "bg-[var(--elevated)] text-[var(--text-muted)]",
    gold: "bg-[var(--primary)]/10 text-[var(--primary)]",
    success: "bg-emerald-500/10 text-emerald-500",
    warning: "bg-amber-500/10 text-amber-500",
    muted: "bg-[var(--border)] text-[var(--text-subtle)]",
  };

  return (
    <span className={cn("badge", variants[variant], className)}>
      {children}
    </span>
  );
}
