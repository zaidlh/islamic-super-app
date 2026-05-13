import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  highlight?: boolean;
}

export function Card({ children, hover, highlight, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "card",
        hover && "card-hover cursor-pointer",
        highlight && "border-[var(--primary)]/30 bg-[var(--primary)]/5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("px-6 py-4 border-b border-[var(--border)]", className)}>{children}</div>
  );
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("px-6 py-4", className)}>{children}</div>;
}

export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn("px-6 py-4 border-t border-[var(--border)] bg-[var(--elevated)]/50", className)}
    >
      {children}
    </div>
  );
}
