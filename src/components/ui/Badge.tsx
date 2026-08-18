import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "normal" | "borderline" | "critical" | "info" | "ghost";
}

export function Badge({
  className,
  variant = "normal",
  children,
  ...props
}: BadgeProps) {
  const styles = {
    normal: "bg-[var(--primary-fixed)] text-[var(--primary)] border-[color:var(--outline-variant)]",
    borderline: "bg-[#fff4d9] text-[#9a5b00] border-[#f4d18d]",
    critical: "bg-[#ffe3e0] text-[#8f1d1d] border-[#f0b0a8]",
    info: "bg-[#e2f0ff] text-[#144a8a] border-[#bfd6f4]",
    ghost: "bg-[var(--surface-container-low)] text-[var(--on-surface-variant)] border-[color:var(--outline-variant)]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em]",
        styles[variant],
        className,
      )}
      {...props}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}
